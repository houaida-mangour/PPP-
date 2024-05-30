import React from 'react';
import {EventCard} from './EventCard';
import Pagination from './Pagination';

const Collection = ({
  data = [],
  emptyTitle,
  emptyStateSubtext,
  page = 1,
  totalPages = 1,
  collectionType,
  urlParamName,
  onPageChange,
}) => {
  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const getEventsForPage = () => {
    const startIndex = (page - 1) * 6;
    const endIndex = Math.min(startIndex + 6, data.length);
    const eventsForPage = data.slice(startIndex, endIndex);
    return chunkArray(eventsForPage, 3);
  };

  return (
    <>
      {data.length > 0 ? (
        <div>
          {getEventsForPage().map((eventsForRow, index) => (
            <div key={index} className="flex justify-center">
              {eventsForRow.map((event) => {
                const hasOrderLink = collectionType === 'Events_Organized';
                const hidePrice = collectionType === 'My_Tickets';

                return (
                  <div key={event._id} className="mx-4">
                    <EventCard event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                  </div>
                );
              })}
            </div>
          ))}
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      ) : (
        <div>
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
