import { 
    Text, 
    View, 
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Pressable,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import {styles, forumSeguidosStyles, forumDonoStyles } from "./styles";
import PropTypes from "prop-types";
import { useAuth } from "../../components/contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../service/firebase/conexao";
import forumList from "../../../hooks/forum/forumList";
import Ionicons from '@expo/vector-icons/Ionicons';


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
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
    
                    // setForumDono()
                    
                    if(data.seguindo?.length > 0) { 
                        const foruns = await forumList({ qIDs: data.seguindo})
                        setForumSeguidos(foruns)
                    }
                }
                
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
            ): (forumDono.length > 0 || forumSeguidos.length > 0) ? 
                (
                    <View style={{ flex: 1}}>
                        <View style={styles.container}>
                            {(forumDono && forumDono.length > 0 ? 
                                <>
                                    <Text style={styles.pageTitle}>{titleForumDono}</Text>    
                                    {_sectionForumList(forumDono, vForumDono)}
                                </>
                            : null)}

                            {(forumSeguidos && forumSeguidos.length > 0 ? 
                                <>
                                    <Text style={styles.pageTitle}>{titleForumSeguidos}</Text>
                                    {_sectionForumList(forumSeguidos, vForumSeguidos)}
                                </>
                            : null)}
                        </View>
                        {forumDono && forumDono.length > 0 ?
                            (
                                <TouchableOpacity
                                    onPress={(e) => navigation.push('ConfigurarForum')}
                                    style={styles.button}>
                                        <Text style={styles.buttonTxt}>Criar Novo Fórum</Text>
                                </TouchableOpacity>
                            ) : null}
                    </View>
                ): (
                    <View style={styles.loadingScreen}>
                        <Text style={styles.loadingText}>Clique em explorar para começar</Text>
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
                keyExtractor={(item) => item.forumID}
                
                renderItem={({ item }) => funcCard(item) }
            />
        
    )
}


function vForumSeguidos({forumID, forumName, forumDesc}) {
    if(!forumName && typeof forumName !== 'string') return;
    if(!forumDesc && typeof forumDesc !== 'string') return;
    if(!forumID) return;

    return (
        <TouchableWithoutFeedback
            onPress={() => Alert.alert(`Olá ${forumID}`)} >
                <View style={forumSeguidosStyles.container} >
                    <Text style={forumSeguidosStyles.title}>{forumName}</Text>
                    <Text style={forumSeguidosStyles.desc}>{forumDesc}</Text>
                </View>
        </TouchableWithoutFeedback>
    )
}

function vForumDono({ forumID, forumName }) {
    if(!forumName && typeof forumName !== 'string') return;
    if(!forumID) return;

    return (
        <Pressable
            onPress={(e) => Alert.alert(`Olá ${forumID}`)} >
                <View style={forumDonoStyles.container}>
                    <View style={forumDonoStyles.rows}>
                        <Text style={forumDonoStyles.title}>{forumName}</Text>
                        <Pressable
                            style={forumDonoStyles.iconEdit}
                            onPress={(e) => {
                                e.stopPropagation();
                                Alert.alert("TO CONFIG")
                            }} >
                                <Ionicons name="settings" size={24} color={colors.p3} />
                        </Pressable>
                    </View>
                    <View style={forumDonoStyles.rows}>
                        <Text style={forumDonoStyles.extra}>46 seguidores</Text>
                        <Text style={forumDonoStyles.extra}>12/12/2020</Text>
                    </View>
                </View>
        </Pressable>
    )
}


HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

