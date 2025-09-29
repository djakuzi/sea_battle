import { TypeParticipant } from "@app-layouts/Battle/types/battle";
import { PayloadAction } from "@reduxjs/toolkit";

/** setIsPlayerMove - установить чей ход. */
export function setParticipantMove (state, action: PayloadAction<TypeParticipant>) {
    state.battle.moveParticipant = action.payload;
}