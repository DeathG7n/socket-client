// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDEY4uBb2FrxMSS3kAkcay96rrx_5pwgCM",
    authDomain: "trade-alert-push-notification.firebaseapp.com",
    projectId: "trade-alert-push-notification",
    storageBucket: "trade-alert-push-notification.appspot.com",
    messagingSenderId: "779838241947",
    appId: "1:779838241947:web:bbe18b0123b78f9bdfda3e",
    measurementId: "G-89ZR2C5M1Q"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
    // when sending message requests to different push services
    return getToken(messaging, { vapidKey: `BOm4EkmXsO5T7FTL-q1swtF4ll_y3YaZQstcBDxGUSoXeh2YtHibp-GErqUyD_juUlh0D2ZWOu6udo5ssBeVfzc` }) //to authorize send requests to supported web push services
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);

                if(localStorage.getItem('fcmToken') && currentToken !==localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }

                else if(!localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }


            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};


// Handle incoming messages. Called when:
// - a message is received while the app has focus
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });