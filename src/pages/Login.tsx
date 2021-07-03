import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const history = useHistory();

    const handleLogin = () => {
       history.push('/page/Dashboard');
    }

   return (
       <IonPage>
           <IonHeader></IonHeader>
           <IonContent fullscreen>
                <IonButton onClick={handleLogin}>
                        Sign In
                </IonButton>
           </IonContent>
       </IonPage>
   ) 
}

export default Login;