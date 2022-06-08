import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {v4 as uuidv4} from 'uuid';

import { useHttp } from '../../hooks/http.hook';
import { heroAdded } from '../heroesList/heroesSlice';

import './heroesAddForm.sass';


const HeroesAddForm = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                id: '',
                name: '',
                description: '',
                element: ''
            }}
            validationSchema ={Yup.object({
                name: Yup.string()
                        .required("Обязательное поле")
                        .min(2, "Минимум 2 символа"),
                description: Yup.string()
                        .required("Обязательное поле"),
                element: Yup.string()
                        .required("Обязательное поле")
                        .max(5, "Элемент не выбран")
            })}
            onSubmit={(values, {resetForm}) => {
                request('http://localhost:3001/heroes', 'POST', JSON.stringify(values))
                        .then(values => console.log(values, 'added'))
                        .then(dispatch(heroAdded(values)))
                        .catch(err => console.error(err));
                resetForm();
                }                
            }>

            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        type="text" 
                        name="name" 
                        id={uuidv4()} 
                        className="form-control"                         
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage className='error' name='name' component='div' />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">Описание</label>
                    <Field
                        as="textarea"
                        name="description" 
                        id={uuidv4()} 
                        className="form-control"                         
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage className='error' name='description' component='div' />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        as="select"
                        name="element"
                        id={uuidv4()} 
                        className="form-select" >
                        <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </Field>
                    <ErrorMessage className='error' name='element' component='div' />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>

            </Form>
        </Formik>        
    )
}

export default HeroesAddForm;