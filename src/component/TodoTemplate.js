import React, {useEffect, useState} from 'react';
import TodoHeader from "./TodoHeader";
import TodoMain from "./TodoMain";
import TodoInput from "./TodoInput";
import './scss/TodoTemplate.scss';

const TodoTemplate = () => {

    //서버에 할일 목록(json)을 요청해서 받아와야 함

    //todos배열을 상태변수로 만들기 (상태관리)
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: '아침 산책하기',
            done: true
        },
        {
            id: 2,
            title: '오늘 주간 신문 읽기',
            done: true
        },
        {
            id: 3,
            title: '샌드위치 사먹기',
            done: false
        },
        {
            id: 4,
            title: '리액트 복습하기',
            done: false
        },
    ]);

    //id값 시퀀스 생성 함수
    const makeNewId = () => {
        // 데이터가 아예 없다면 id=1 을 리턴
        return todos.length===0 ? 1 : todos[todos.length-1].id+1;
    }
    // todoInput에게 todoText를 받아오는 함수 (콜백함수)
    const addTodo = todoText => {
        console.log('할일 정보 in TodoTemplate:', todoText);

        const newTodo={
            id: makeNewId(),
            title: todoText,
            done: false
        };

        //todos.push(newTodo)

        // React 상태변수는 무조건!!!  setter 통해서만 변경해야 렌더링에 적용
        // 다만 상태변수는 불변성(immutable)을 가지기 때문에
        // 기존 상태에서 변경 불가하고 새로운 상태를 만들어서 변경해야 한다
        // const copyTodos = todos.slice();
        // copyTodos.push(newTodo);

        // setTodos(todos.concat([newTodo]));  //concat으로 배열 2개 연결
        setTodos([...todos, newTodo]);
    };

    //삭제 처리 함수
    const removeTodo = id =>{
        // console.log(`삭제대상 id: ${id}`);
       setTodos(todos.filter(todo=>todo.id!==id));
        //삭제 대상 id와 "다른" id들의 내용만 filtering
        // 같은 id는 지워지는 효과
    };


    useEffect(()=>{
        console.log(todos);
    }, [todos]);

    return (
        <div className={'TodoTemplate'}>
            <TodoHeader/>
            <TodoMain todoList={todos} remove={removeTodo}/>
            <TodoInput addTodo = {addTodo}/>

        </div>
    );
};

export default TodoTemplate;