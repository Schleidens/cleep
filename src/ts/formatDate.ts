export //function to format date notes from firebase timestamp
  const formatDate = (incomingDate: string | number | Date) => {
    return new Date(incomingDate).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };