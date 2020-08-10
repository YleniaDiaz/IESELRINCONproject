import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, Col } from 'react-bootstrap';

import ProfessionalService from '../../../../services/professional.service';
import DepartmentService from '../../../../services/department.service';
import BtnGoOn from '../buttons/forms/BtnGoOn';

const ChooseProfessional = ({ values, handleInputChange, nextStep }) => {
  const { department, teacher } = values;
  const [departmentValues, setDepartmentValues] = useState([]);
  const [teacherValues, setTeacherValues] = useState([]);

  const [isUndefined, setIsUndefined] = useState('disabled');

  useEffect(() => {
    getDepartmentsFromDB();
    // Se le llama al cargar la página
    const valueDepartment = parseInt(department);
    if (valueDepartment === 0) {
      getAllTeachers();
    } else if (valueDepartment > 0) {
      getTeachersFromDB(valueDepartment);
    }
  }, [department]);

  useEffect(() => {
    teacher && setIsUndefined('');
    console.log('Valor de teacher', teacher);
  }, [teacher]);

  // Devuelve todos los departamentos para pintarlos en el select
  const getDepartmentsFromDB = () => {
    new Promise((resolve, reject) => {
      resolve(DepartmentService.getAll());
    }).then((res) => {
      if (res.data.data != null) setDepartmentValues(res.data.data);
    }).catch(err => console.error('Falló la consulta getDepartmentsFromDB ', err));
  };

  // Devuelve todos los profesores que contengan el mismo departmentId que el id de department
  const getTeachersFromDB = (ChosenDepartmentId) => {
    new Promise((resolve, reject) => {
      resolve(ProfessionalService.getWithDepartmentId(ChosenDepartmentId));
    }).then((res) => {
      let teachers = res.data;
      if (teachers != null) {
        if (teachers.data != null) {
          if (teachers.data.length > 0) setTeacherValues(res.data.data);
        } else {
          teachers = [];
          setTeacherValues(teachers);
        }
      }
    }).catch(err => console.log('Falló la consulta getTeachersFromDB', err));
  };

  // Devuelve todos los profesores para pintarlos en los radio button
  const getAllTeachers = () => {
    new Promise((resolve, reject) => {
      resolve(ProfessionalService.getAll());
    }).then((res) => {
      if (res.data != null) {
        if (res.data.data != null) {
          const teachers = res.data.data;
          const filteredTeachers = teachers.filter((teacher) => teacher.department !== 1);
          setTeacherValues(filteredTeachers);
        }
      }
    }).catch(err => console.log('Falló la consulta getAllTeachers', err));
  };

  return (
    <>
      <Form.Row>
        <Form.Group className='col d-lg-flex align-items-center'>
          <Col sm={12} lg={6}>
            <Form.Label
              htmlFor='department'
              className='m-0'
            >
              DEPARTAMENTO
            </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='p-0'>
            <Form.Control
              as='select'
              className='form-control'
              value={department}
              name='department'
              id='department'
              onChange={handleInputChange}
            >
              <option value='0'>Todos</option>
              {departmentValues.map(d => (
                <option
                  key={d.id}
                  value={d.id}
                >
                  {d.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group className='col d-lg-flex'>
          <Col sm={12} lg={6}>
            <Form.Label
              htmlFor='teacher'
              className='m-0'
            >
              PROFESORADO
            </Form.Label>
          </Col>
          <Col sm={12} lg={6} className='border p-2 my-auto'>
            {teacherValues.map(t => (
              <Form.Check
                className='p-0 d-flex'
                key={t.id}
              >
                <Col xs={4}>
                  <Form.Check
                    type='radio'
                    name='teacher'
                    id={t.id}
                    value={t.id}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col xs={8} className='text-left'>
                  <Form.Label htmlFor={t.id} checked>
                    {t.name}
                  </Form.Label>
                </Col>
              </Form.Check>
            ))}
          </Col>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Col className='d-flex justify-content-center mt-2'>
          <BtnGoOn
            content='siguiente'
            nextStep={nextStep}
            isUndefined={isUndefined}
          />
        </Col>
      </Form.Row>
    </>
  );
};

export default ChooseProfessional;
