import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted, heroAdded } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            // .then(data => console.log(data, 'deleted'))
            .then(dispatch(heroDeleted(id)))            
            .catch(err => console.error(err))
    }, [request]);

    const onAdd = useCallback(() => {
        request('http://localhost:3001/heroes', 'POST')
            .then(data => console.log(data, 'added'))
            .then(data => dispatch(heroAdded(data)))
            .catch(err => console.error(err))
    }, [request]);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />    
        })
    }

    const elements = renderHeroesList(heroes);

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;