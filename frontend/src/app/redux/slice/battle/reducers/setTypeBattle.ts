import { EnumVariantPlayType } from "@app-core/data/list-component/interfaces/variantsPlay.interface";
import { PayloadAction } from "@reduxjs/toolkit";

/** setTypeBattle - установить тип игры. */
export function setTypeBattle(state, action: PayloadAction<EnumVariantPlayType>) {
	state.battle.type = action.payload;
};