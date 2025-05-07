import { 
    Text, 
    View, 
    FlatList,
    TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import vForumDono from "./vForumDono";
import styles from "./styles";
import vForumSeguidos from "./vForumSeguidos";
import PropTypes from "prop-types";
import { useAuth } from "../../components/contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../service/firebase/conexao";



export default function HomeScreen({ navigation }) {

    const [forumSeguidos, setForumSeguidos] = useState([])
    const [forumDono, setForumDono] = useState([])
    const [loading, setLoading] = useState(true)

    // User:
    const { user, userLoading, authLoading } = useAuth();
    // > Verificação:
    useEffect(() => {
        if(authLoading || !user) {
            navigation.navigate('AuthStack')
        } else {
            async function run() {
                const userRef = doc(db, 'usuarios', user.uid);
                const docSnap = await getDoc(userRef);
    
                if (!docSnap.exists()) return;
                const data = docSnap.data();
    
                // setForumDono()
                if(data.seguindo && data.seguindo.length > 0) setForumSeguidos(data.seguindo)
                setLoading(false)
            }
    
            run()
        }
    }, [user, authLoading])
    

    

    const titleForumSeguidos = (
        forumSeguidos && forumSeguidos.length > 0 ?
            (forumSeguidos.length > 1 ?
                "Fóruns Seguidos"
                : "Fórum Seguido"
            )
        : undefined
    )
    const titleForumDono = (
        forumDono && forumDono.length > 0 ?
            (forumDono.length > 1 ? 
                  "Seus Fóruns"
                : "Seu Fórum"
            )
        : undefined
    )

    return (
        <SafeAreaView style={styles.safeArea}>
            {loading ? (
                <View style={styles.loadingScreen}>
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ): (
                <View>
                    <View style={styles.container}>
                        {(forumDono ? 
                            <>
                                <Text style={styles.pageTitle}>{titleForumDono}</Text>    
                                {_sectionForumList(forumDono, vForumDono)}
                            </>
                        : null)}

                        {(forumSeguidos ? 
                            <>
                                <Text style={styles.pageTitle}>{titleForumSeguidos}</Text>
                                {_sectionForumList(forumSeguidos, vForumSeguidos)}
                            </>
                        : null)}
                    </View>
                    <TouchableOpacity
                        onPress={(e) => navigation.push('ConfigurarForum')}
                        style={styles.button}>
                            <Text style={styles.buttonTxt}>Criar Novo Fórum</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}


function _sectionForumList(list, funcCard) {
    return (
        <FlatList 
                style={styles.section}
                scrollEnabled={false}
                data={list}
                keyExtractor={(item) => item?.forumID}
                
                renderItem={({ item }) => funcCard(item) }
            />
        
    )
}



HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

