
import { EnumParticipant } from "@app-layouts/Battle/types/battle.enum";
import { PayloadAction } from "@reduxjs/toolkit";

/** setIsPlayerMove - установить чей ход. */
export function setParticipantMove(state, action: PayloadAction<EnumParticipant>) {
	state.battle.moveParticipant = action.payload;
}