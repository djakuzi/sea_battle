import './app/styles/theme/theme.dark.css';
import './app/styles/theme/theme.white.css';
import './app/styles/font.css';
import './app/styles/main.css';
import './app/styles/layouts/flex-box.css';
import './app/styles/resetStyles.css';
import './app/styles/animations/show-opacity.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import React, { lazy, Suspense } from "react";
import { Provider } from 'react-redux';
import store from './app/redux/store';
import FullLoad from './app/common/components/FullLoad/FullLoad';
import BattleBot from './app/layouts/Battle/pages/BattleBot/BattleBot';
import OneVsOne from './app/layouts/Battle/pages/OneVsOne/OneVsOne';
import { CONFIG_APP } from './app/core/config/app.config';
import { EnumVariantPlayType } from '@app-core/data/list-component/interfaces/variantsPlay.interface';

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
			path: EnumVariantPlayType.BOT,
            element: <BattleBot></BattleBot>,
          },
          {
			path: EnumVariantPlayType.ONE_VS_ONE,
            element: <OneVsOne></OneVsOne>,
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

	createRoot(element).render(
		<Provider store={store}>
		<RouterProvider router={ROUTER} />
		</Provider>
	);
  
} catch (error) {
  console.error(error);
}
