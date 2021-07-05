import React, {useState} from 'react';
import { IonButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';

const window = {
    recaptchaVerifier: undefined
  };
  
const Login: React.FC = () => {
    const history = useHistory();
    const [mobile, setMobile] = useState('98181 71799');
    const [fetchedOTP, setOTP] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    const routeToDashboard = () => { 
       history.push('/page/Dashboard');
    }
    const notifyPanel = (msg:string) => {
      setMessage(msg);
      setShowToast(true);
    }

    const handleSignIn = (e:any) => {
        e.preventDefault();
        configureCaptcha();
        const countryCode = '+91';
        const phoneNumber =  countryCode + mobile; //add code dynamically   
        const appVerifier = window.recaptchaVerifier;
        //@ts-ignore
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            //@ts-ignore
            window.confirmationResult = confirmationResult;
            // console.log('OTP has been sent !');
            notifyPanel('OTP is sent to your number')
            // ...
            }).catch((error) => {
                notifyPanel('Message sending failed. Please try again')
            });        
    }

    const handleOTPverification = (e:any) => {
        e.preventDefault();
        const code = fetchedOTP;
        //@ts-ignore
        window.confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user)); //save response to state
        //alert('user is verified');
        //-------------------------------------on successful user verification, navigate to app dashboard 
        notifyPanel('Connection Successfull !');
        setTimeout(() => {
          routeToDashboard();
        }, 1000)
        // ...
        //@ts-ignore
        }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
            //alert('Cannot verify OTP. Please try again');
            notifyPanel('Cannot verify OTP. Please try again');
        });
    }

    const configureCaptcha = () => {
        //@ts-ignore
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response:any) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              //@ts-ignore
              handleSignIn();
              console.log('recaptcha verified..');
            },
            defaultCountry: 'IN' //optional
          });
    } 

   return (
       <IonPage>
           <IonHeader>
           <IonToolbar>
                   
                    <IonTitle>Login with Firebase</IonTitle>
        </IonToolbar>
           </IonHeader>
           <IonContent fullscreen>
             <div style={{ margin: '10px', border: '1px solid #cccccc', borderRadius: '10px'}}>
             <IonItem style={{ padding: '10px'}}>
                 <div id="sign-in-button"></div>
                   <IonInput 
                     value={mobile} 
                     placeholder="Enter your mobile number"
                     onIonChange={e => setMobile(e.detail.value!)}
                     clearInput
                     >

                    </IonInput>
               </IonItem>
                <IonButton onClick={handleSignIn}>
                        Sent OTP
                </IonButton>
             </div>
             <div style={{ margin: '10px', border: '1px solid #cccccc', borderRadius: '10px'}}>
             <IonItem style={{ padding: '10px'}}>
                   <IonInput 
                     placeholder="Enter your OTP"
                     onIonChange={e => setOTP(e.detail.value!)}
                     clearInput
                     >

                    </IonInput>
               </IonItem>
                <IonButton onClick={handleOTPverification}>
                        Verify OTP
                </IonButton>
             </div>
             <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={message}
                duration={1500}
      />
                
           </IonContent>
       </IonPage>
   ) 
}

export default Login;