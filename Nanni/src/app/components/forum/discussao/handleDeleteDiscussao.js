import { deleteDoc, doc } from "firebase/firestore"
import PropTypes from "prop-types"
import { db } from "../../../../service/firebase/conexao"
import { Alert } from "react-native"

export default function handleDeleteDiscussao(discussaoPath) {
    async function discussaoDelete() {
        try {
            return await deleteDoc(
                doc(db, ...discussaoPath.split("/"))
            )
        } catch(err) {
            console.error(err)
            alert("Erro ao tentar apagar fórum")
            return false;
        }
    }


    Alert.alert(
        "Você tem certeza disso?",
        "Os dados de discussão não poderão ser recuperados.",
        [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Sim",
                onPress: discussaoDelete, 
            },
        ],
        { cancelable: true }
    )
}


handleDeleteDiscussao.propTypes = {
    discussaoPath: PropTypes.string.isRequired,
}