// // src/components/EntriesTable.tsx
// import React from 'react';
// import { Edit2, Trash2 } from 'lucide-react';
// import { Entry } from '../types';

// interface EntriesTableProps {
//   entries: Entry[];
//   onEdit: (entry: Entry) => void;
//   onDelete: (entry: Entry) => void;
//   loading?: boolean;
// }

// const EntriesTable: React.FC<EntriesTableProps> = ({ entries, onEdit, onDelete, loading }) => {
//   const formatType = (type: string) => {
//     return type === 'TV_Show' ? 'TV Show' : type;
//   };

//   if (entries.length === 0 && !loading) {
//     return (
//       <div className="text-center py-12 bg-white rounded-lg shadow">
//         <p className="text-gray-500 text-lg">No entries found. Add your first movie or TV show!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto bg-white rounded-lg shadow">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Title
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Type
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Director
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Budget
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Location
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Duration
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Year/Time
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {entries.map((entry) => (
//             <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm font-medium text-gray-900">{entry.title}</div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                   entry.type === 'Movie' 
//                     ? 'bg-blue-100 text-blue-800' 
//                     : 'bg-purple-100 text-purple-800'
//                 }`}>
//                   {formatType(entry.type)}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {entry.director}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {entry.budget || '-'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {entry.location || '-'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {entry.duration || '-'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {entry.yearTime || '-'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => onEdit(entry)}
//                     className="text-blue-600 hover:text-blue-900 transition-colors p-1"
//                     title="Edit"
//                   >
//                     <Edit2 size={18} />
//                   </button>
//                   <button
//                     onClick={() => onDelete(entry)}
//                     className="text-red-600 hover:text-red-900 transition-colors p-1"
//                     title="Delete"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EntriesTable;


















// src/components/EntriesTable.tsx
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Edit2, Trash2 } from 'lucide-react';
import { Entry } from '../types';

interface EntriesTableProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
  fetchMore: () => void;
  hasMore: boolean;
  loading?: boolean;
}

const EntriesTable: React.FC<EntriesTableProps> = ({ entries, onEdit, onDelete, fetchMore, hasMore, loading }) => {
  const formatType = (type: string) => {
    return type === 'TV_Show' ? 'TV Show' : type;
  };

  if (entries.length === 0 && !loading) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No entries found. Add your first movie or TV show!</p>
      </div>
    );
  }

  return (
    <div id="scrollableDiv" style={{ height: 500, overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={entries.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<p className="text-center p-4">Loading...</p>}
        scrollableTarget="scrollableDiv"
      >
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Director</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year/Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.type === 'Movie' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {formatType(entry.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.director}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.budget || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.location || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.duration || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.yearTime || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(entry)}
                        className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(entry)}
                        className="text-red-600 hover:text-red-900 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default EntriesTable;
