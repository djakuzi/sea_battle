import { JSX, useRef } from "react";
import styles from './SearchPlayer.module.css';
import cn from "classnames";
import { PropsSearchPlayer } from "./SearchPlayer.props";
import ListPlayer from "../ListPlayer/ListPlayer";
import ButtonSearch from "../../../../../../common/components/ButtonSearch/ButtonSearch";
import { useFindPlayers } from "@app-common/script/hooks/api-hooks/useFIndPlayers.hook";
import ErrorMessage from "@app-common/components/ErrorMessage/ErrorMessage";

export default function SearchPlayer({
    cls = '',
}: PropsSearchPlayer): JSX.Element {
    //hook
    const { listPlayers, error, findFindPlayers} = useFindPlayers();
    //ref
    const refForm = useRef<HTMLFormElement>(null);

    const onSubmit = async (formData: FormData): Promise<void> => {
        const data = {
            nickname: formData.get('nickname'),
        };

        findFindPlayers(data);
    };

    return (
        <div className={cn(
            styles['search'], cls)}
        >
            <form
                ref={refForm}
                className={cn(styles['search-field'])}
                action={onSubmit}
            >
                <input
                    className={styles['search-input']}
                    type="text"
                    name="nickname"
                    placeholder="Имя игрока"
                />
                <ButtonSearch
                    cls={styles['search-btn']}
                    text="Найти"
                    type="submit"
                />
            </form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {listPlayers && <ListPlayer cls={styles['search-list']} listPlayers={listPlayers}/>}
        </div>
    );
}