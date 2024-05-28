// Collection.js
import React from 'react';
import EventCard from './EventCard';
import Pagination from './Pagination';

const Collection = ({
  data = [], // Default value for data
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}) => {
  return (
    <>
      {data.length > 0 ? (
        <div>
          <ul >
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const hidePrice = collectionType === 'My_Tickets';

              return (
                <li key={event._id} className="flex justify-center">
                  <EventCard event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
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
