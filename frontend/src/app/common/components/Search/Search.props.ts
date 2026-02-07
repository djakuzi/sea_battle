import { PropsStandartCls } from '@app-common/types/props/StandartCls.interface';
import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { PropsButtonSearch } from '../ButtonSearch/ButtonSearch.props';

export interface PropsSearch extends PropsStandartCls {
	onSubmit: (formData: FormData) => Promise<void>;
	search?: InputHTMLAttributes<HTMLInputElement> & PropsStandartCls;
	btn?: ButtonHTMLAttributes<HTMLButtonElement> & PropsButtonSearch;
	visual?: 'blur' | 'blur-gradient';
}
