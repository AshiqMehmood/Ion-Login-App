import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


class Login extends React.Component<RouteComponentProps> {
    state: any = {
        count: 0
    }

    handleLogin = () => {
        //@ts-ignore
       this.props.history.push('/page/Dashboard');
    }

   render() {
    return (
        <IonPage>
            <IonHeader></IonHeader>
            <IonContent fullscreen>
                 <IonButton onClick={this.handleLogin}>
                         Sign In
                 </IonButton>
            </IonContent>
        </IonPage>
    ) 
   }
}

export default withRouter(Login);