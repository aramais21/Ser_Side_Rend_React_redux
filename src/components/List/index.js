import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchObj } from '../../redux/actions/objectCreators';

import { selectData } from '../../redux/selectors';
import Card from '../Card';

import './style.css';

const List = () => {
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchObj());
    },[dispatch])

    return(
        <div className = 'list' >
            {data.map((item) => (
              <Card  {...item} />
            ))}
        </div>
    )
}

export default List;