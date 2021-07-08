import React from 'react';
// import { RouteComponentProps } from 'react-router';
import './ExploreContainer.css';

type MyProps = {
  name: string;
}

class ExploreContainer extends React.Component<MyProps> {
  render(){
    return (
    <div className="container">
      <strong>{this.props.name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );}
};

export default ExploreContainer;
