import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
import PropTypes from 'prop-types';


const pushState = (obj, url) =>
  window.history.pushState(obj, '', url)

const onPopState = handler => {
  window.onpopstate = handler;
}

class App extends React.Component {
  static propTypes = {
    initialData : PropTypes.object
  }

  state = this.props.initialData;

  componentDidMount() {
    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      })
    });
  }
  componentWillUnmount() {
    onPopState(null);
  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId : contestId },
      `/contest/${contestId}`
    );
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest._id,
        contests : {
          ...this.state.contests,
          [contest._id]: contest
        }
      });
    });
  };

  fetchContestList = () => {
    pushState(
      { currentContestId : null },
      '/'
    );
    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
      });
    });
  };

  fetchNames = (nameIds) => {
    if(nameIds.length === 0) {
      return;
    }
    api.fetchNames(nameIds).then(names => {
      this.setState({
        names
      });
    });
  };

  addName = (newName, contestId) => {
    api.addName(newName, contestId).then(resp =>
      this.setState({
        contests: {
          ...this.state.Contests,
          [resp.updatedContest._id]: resp.updatedContest
        },
        names: {
          ...this.state.names,
          [resp.newName._id]: resp.newName
        }
      })
    )
    .catch(console.error);
  }

  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }

  pageHeader() {
    if(this.state.currentContestId) {
      return this.currentContest().contestName;
    }

    return 'Naming Contests';
  }

  lookupName = (nameId) => {
    if(!this.state.names || !this.state.names[nameId]){
      return {
        name: '...'
      };
    }
    return this.state.names[nameId];
  };

  currentContent(){
    if(this.state.currentContestId){
      return <Contest
      contestListClick = {this.fetchContestList}
      fetchNames = {this.fetchNames}
      lookupName={this.lookupName}
      addName={this.addName}
       {...this.currentContest()} />;
     }
      return  <ContestList
              onContestClick={this.fetchContest}
              contests = {this.state.contests} />
  }

  render() {
    return (
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;
