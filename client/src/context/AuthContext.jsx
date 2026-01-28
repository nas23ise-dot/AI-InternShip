import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db, rtdb } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { ref, set, onDisconnect } from 'firebase/database';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribeDoc = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
            // Clean up previous document listener if it exists
            if (unsubscribeDoc) {
                unsubscribeDoc();
                unsubscribeDoc = null;
            }

            if (firebaseUser) {
                // Set initial user state immediately to reveal the app
                const baseUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    emailVerified: firebaseUser.emailVerified,
                    metadata: firebaseUser.metadata
                };

                setUser(baseUser);
                setLoading(false);

                // Set up real-time listener for Firestore profile enrichment
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                unsubscribeDoc = onSnapshot(userDocRef,
                    (docSnap) => {
                        if (docSnap.exists()) {
                            const firestoreData = docSnap.data();
                            console.log('Enriching user from Firestore:', firebaseUser.uid, firestoreData);

                            setUser(prevUser => ({
                                ...prevUser,
                                ...firestoreData,
                                // Ensure UID is never overwritten
                                uid: firebaseUser.uid
                            }));
                        }
                    },
                    (err) => {
                        console.error('Firestore real-time sync failed:', err);
                    }
                );

                // Set Realtime Status (fail silently if RTDB not setup)
                try {
                    const statusRef = ref(rtdb, 'status/' + firebaseUser.uid);
                    set(statusRef, { state: 'online', last_changed: new Date().toISOString() });
                    onDisconnect(statusRef).set({ state: 'offline', last_changed: new Date().toISOString() });
                } catch (rtdbErr) {
                    console.warn('RTDB Status failed:', rtdbErr);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeDoc) unsubscribeDoc();
        };
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
