// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {v4 as uuidv4} from 'uuid';

import './heroesAddForm.sass';


const HeroesAddForm = ({onAdd}) => {
    return (
        <Formik
            initialValues={{
                name: '',
                text: '',
                element: ''
            }}
            validationSchema ={Yup.object({
                name: Yup.string()
                        .required("Обязательное поле")
                        .min(2, "Минимум 2 символа"),
                text: Yup.string()
                        .required("Обязательное поле")
                        // .min(10, "Минимум 10 символов")
            })}
            // onSubmit={(values, {resetForm}) => {
            //     console.log(JSON.stringify(values, null, 2));
            //     console.log(values);
            //     console.log(values.name);
            //     console.log(values.name.getAttribute('id'));
            //     resetForm();
            // }} 
            onSubmit={onAdd}
            >

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
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        as="textarea"
                        name="text" 
                        id={uuidv4()} 
                        className="form-control"                         
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage className='error' name='text' component='div' />
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