import './app/styles/theme/theme.dark.css';
import './app/styles/theme/theme.white.css';
import './app/styles/font.css';
import './app/styles/main.css';
import './app/styles/layouts/flex-box.css';
import './app/styles/ui/button.css';
import './app/styles/resetStyles.css';
import './app/styles/animations/show-opacity.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import React, { lazy, Suspense } from "react";
import { Provider } from 'react-redux';
import store from './app/redux/store';
import FullLoad from './app/common/components/FullLoad/FullLoad';
import BattleBot from './app/layouts/Battle/pages/BattleBot/BattleBot';
import BattleOnline from './app/layouts/Battle/pages/BattleOnline/BattleOnline';
import { CONFIG_APP } from './app/core/config/app.config';
import { isDevMode } from './app/common/script/modules/Developer/methods/isDevMode';

const RootController = lazy(() => import('./app/root-controller/RootController'));
const Menu = lazy(() => import('./app/layouts/Menu/Menu.layouts'));
const Constructor = lazy(() => import('./app/layouts/Constructor/Constructor'));
const Battle = lazy(() => import('./app/layouts/Battle/Battle'));

const router = [
  {
    path: "/",
    element: <Suspense fallback={<FullLoad text='Подождите..' />}> <RootController /> </Suspense>,
    children: [
      {
        path: "menu",
        element: <Suspense fallback={<FullLoad text='Подождите..' />}> <Menu /> </Suspense>,
      },
      {
        path: "constructor",
        element: <Suspense fallback={<FullLoad text='Переходим..' />}> <Constructor /> </Suspense>,
      },
      {
        path: "battle",
        element: <Suspense fallback={<FullLoad text='Загрузка..' />}> <Battle /> </Suspense>,
        children: [
          {
            path: "bot",
            element: <BattleBot></BattleBot>,
          },
          {
            path: "online",
            element: <BattleOnline></BattleOnline>,
          },
        ],
      }
    ]
  }
];

const routerOptions = {
  basename: CONFIG_APP.baseName,
};
try {
  const ROUTER = createBrowserRouter(router, routerOptions);

  const element = document.getElementById("root") || document.body;

  if (!isDevMode()) {
    createRoot(element).render(
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={ROUTER} />
        </Provider>
      </React.StrictMode>
    );
  } else {
    createRoot(element).render(
      <Provider store={store}>
        <RouterProvider router={ROUTER} />
      </Provider>
    );
  }
} catch (error) {
  console.error(error);
}
