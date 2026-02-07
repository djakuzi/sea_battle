import { PropsStandartCls } from "@app-common/types/props/StandartCls.interface";

export interface PropsScrollContainer extends PropsStandartCls {
	children: React.ReactNode;
	type?: 'horizontal' | 'vertical';
};