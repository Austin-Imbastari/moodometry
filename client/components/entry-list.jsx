import React from 'react';
import EntryListItem from './entry-list-item';

class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      entries: []
    };
    this.getEntries = this.getEntries.bind(this);
    this.createEntries = this.createEntries.bind(this);
  }

  componentDidMount() {
    this.getEntries();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.filterOptions !== this.props.filterOptions) {
      this.getEntries();
    }
  }

  getEntries() {
    fetch(`/api/entries/search?moodId=${this.props.filterOptions.moodId}&eventId=${this.props.filterOptions.eventId}&dowId=${this.props.filterOptions.dowId}&sort=${this.props.filterOptions.sort}`)
      .then(result => result.json())
      .then(entries => {

        console.log(entries);
        this.setState({
          entries: entries,
          isLoading: false
        });
      })
      .catch(err => console.error(err));
  }

  createEntries() {
    const entryList = this.state.entries.map(entry => {
      return (
        <EntryListItem
          key={entry.entryId}
          entry={entry}
          getEntries={this.getEntries}
          createEntries={this.createEntries}
        />
      );
    });
    return entryList;
  }

  render() {
    if (this.state.isloading) return <h1>Loading</h1>;
    const renderEntries = this.createEntries();

    return (
      <div className="entry-list cutoff-fix">
        <div className="container entry-container">
          <div>
            {renderEntries}
          </div>
        </div>
      </div>

    );
  }

}

export default EntryList;
