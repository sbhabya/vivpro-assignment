import StarRating from "./StarRating"
import { numericSort } from "../utils/sortFunction"

export const COLUMNS = (songsDataSetter) => [
    {
        Header: 'Index',
        accessor: 'index',
        sortType: numericSort
    },
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Title',
        accessor: 'title'
    },
    {
        Header: 'Dancebility',
        accessor: 'danceability',
        sortType: numericSort
    },
    {
        Header: 'Energy',
        accessor: 'energy',
        sortType: numericSort
    },
    {
        Header: 'Key',
        accessor: 'key',
        sortType: numericSort
    },
    {
        Header: 'Loudness',
        accessor: 'loudness',
        sortType: numericSort
    },
    {
        Header: 'Mode',
        accessor: 'mode',
        sortType: numericSort
    },
    {
        Header: 'Acousticness',
        accessor: 'acousticness',
        sortType: numericSort
    }, 
    {
        Header: 'Instrumentalness',
        accessor: 'instrumentalness',
        sortType: numericSort
    },
    {
        Header: 'Liveness',
        accessor: 'liveness',
        sortType: numericSort
    },
    {
        Header: 'Valence',
        accessor: 'valence',
        sortType: numericSort
    },
    {
        Header: 'Tempo',
        accessor: 'tempo',
        sortType: numericSort
    },
    {
        Header: 'Duration',
        accessor: 'duration_ms',
        sortType: numericSort
    },
    {
        Header: 'Time Signature',
        accessor: 'time_signature',
        sortType: numericSort
    },
    {
        Header: 'Num Bars',
        accessor: 'num_bars',
        sortType: numericSort
    },
    {
        Header: 'Num Sections',
        accessor: 'num_sections',
        sortType: numericSort
    },
    {
        Header: 'Num Segments',
        accessor: 'num_segments',
        sortType: numericSort
    },
    {
        Header: 'class',
        accessor: 'class_',
        sortType: numericSort
    },
    {
        Header: 'Rating',
        accessor: 'rating',
        sortType: numericSort,
        Cell: ({ value, row }) => <StarRating stars={value} songId={row.original.index} 
        songsDataSetter={songsDataSetter}
        songsData={row.original}/>,
    }
]