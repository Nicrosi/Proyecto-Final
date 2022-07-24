import Options from "./Options";

const Overview = (props) => {
  const options = [
    {
      name: "How can I be part of the tournament?",
      handler: props.actionProvider.handleInscription,
      id: 1,
    },
    {
      name: "Where can I see the tournaments?",
      handler: props.actionProvider.handleTournament,
      id: 2,
    },
    {
      name: "How can I contact the tournament organizer?",
      handler: props.actionProvider.handleContact,
      id: 3,
    },
    {
      name: "Where can I see the sponsors of the tournament?",
      handler: props.actionProvider.handleSponsors,
      id: 4,
    },
  ];
  return <Options options={options} title="Frequent Questions" {...props} />;
};

export default Overview;
