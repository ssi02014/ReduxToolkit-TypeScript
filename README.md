# 💻 ReduxToolkit-TypeScript

## 🏃‍♂️ Start

- yarn create react-app (프로젝트 이름) --template typescript
- yarn add redux react-redux @reduxjs/toolkit redux-devtools-extension @types/react-redux

<br />

## 👨‍💻 createAsyncThunk

- 리덕스에서 비동기 처리할 때 쓰이는 그 thunk다.

```ts
export const insertList: any = createAsyncThunk(
  "INSERT_TODO",
  async (data, thunkAPI) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data
    );
    return response.data;
  }
);
```

- 여기서 `GET_TODO`가 action의 이름이다. 이 이름으로 변수명이 자동으로 만들어진다.
- `data`에서는 서버 api를 호출할 때 전달 할 데이터가 담아져 있다.

<br />

## 👨‍💻 createSlice

- reducers는 내부에서 진행되는 action 및 동기 action을넣는 공간이다.

### 🏃‍♂️ reducers와 extrareducers

```ts
// 내부/동기 action 선언
import { createSlice } from '@reduxjs/toolkit';

initailState = {
  isLogin = false, // boolean
  data = null, // string
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { // 내부 action 및 동기 action
    logIn((state, action) => {
       state.isLogin = true;
       state.data = action.payload;
    }),
  }
});

// 호출
import { userSlice } from '../reducers/index'

const onLogIn = useCallback(() => {
  dispatch(userSlice.actions.logIn(...data));
},[])

```

<br />

- extraReducers는 reducers와 반대로 외부/비동기 action을 넣으면 된다.
- pending은 요청, fulfilled는 성공, rejected는 실패 이 3가지로 나뉜다. redux-toolkit은 이 세가지에 대해서 명확하게 정해져 있다.

```ts
// 외부/비동기 action 선언
const todoReducer = createSlice({
  name: "todoList",
  initialState,
  reducers: {},
  extraReducers: {
    [getList.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.todos = [...payload];
    },
    [getList.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

// 호출
import { getList } from "../features/todos";

useEffect(() => {
  dispatch(getList());
}, [dispatch]);
```

<br />

### 🏃‍♂️ extrareducers 타입 추론

- 타입스크립트에서 redux-toolkit을 사용할 때, `addCase`를 사용하면 보다 더 타입에 대한 추론이 가능하다고 한다.
- `addmactcher`는 여러 상황이지만, 같은 업무를 처리할 때 사용한다.
- `addDefault`는 switch문에서 default를 의미한다.

```ts
const todoReducer = createSlice({
  name: "todoList",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getList.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.todos = [...payload];
      })
      .addCase(getList.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addMatcher((action) => { // action별 공통업무
        return action.type.includes(‘/pending’);
      }, (state, action) => {
		    // 업무
      })
      .addDefault((state, action) => {
        // default
      }),
});
```

<br />

## 👨‍💻 redux-persist

- redux는 상태 관리에 효율적이지만 리덕스 상태 앱을 종료하거나 브라우저를 새로 고침만 해도 저장되어 있던 모든 상태들이 없어진다.
- Redux Persist 라이브러리를 사용하면 마치 캐시 기능과 같이 상태 값을 지속적으로 저장한다.

### 🏃‍♂️ 웹 캐싱

- 캐싱 기본 개념: 캐싱은 애플리케이션의 처리 속도를 높여준다. 이미 가져온 데이터나 계산된 결과값의 복사본을 저장함으로써 처리 속도를 향상시키며, 이를 통해 향후 요청을 더 빠르게 처리할 수 있다. 대부분의 프로그램이 동일한 데이터나 명령어에 반복해서 엑세스하기 때문에 캐싱은 효율적인 아키텍처 패턴이다.
- 웹 캐시(WEB Cache): 사용자(client)가 웹 사이트(server)에 접속할 때, 정적 컨텐츠(이미지, JS, CSS 등)를 특정 위치(client, network 등)에 저장하여, 웹 사이트 서버에 해당 컨텐츠를 매번 요청하여 받는 것이 아니라, 특정 위치에서 불러옴으로써 사이트 응답시간을 줄이고, 서버 트래픽 감소 효과를 볼 수 있다.

<br />

- 🔖 store.ts

```ts
import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import reducer from "./rootReducer";
import storage from "redux-persist/lib/storage/session"; // 추가
import { persistReducer } from "redux-persist"; // 추가

const { logger } = require("redux-logger");

// 추가
const persistConfig = {
  key: "root",
  storage,
  // whitelist: [] 배열안에 들어가있는 리듀서만 저장
  // blacklist: [] 배열안에 들어가있는 리듀서만 제외한다.
};

const middleware = [...getDefaultMiddleware(), logger];

const persistedReducer = persistReducer(persistConfig, reducer); // 추가

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

//타입스크립트에서 리덕스를 사용할 때 공통적으로 export해야되는 것들
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
```

- 🔖 index.ts

```tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react"; //추가
import { persistStore } from "redux-persist"; //추가
import { Provider } from "react-redux";
import store from "./features/store";

const persistor = persistStore(store); //추가

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      //추가
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
```

<br />

## 💫 json-server

- json 파일을 기반으로 서버를 열어볼 수 있는 라이브러리

```
$ npx json-server ./data.json --port 4000
      또는
$ yarn global add json-server
$ json-server ./data.json --port 4000
```

```
  http://localhost:4000/posts 으로 접속
```
