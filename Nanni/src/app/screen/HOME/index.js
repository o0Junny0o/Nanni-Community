import { 
    Text, 
    View, 
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Pressable,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';


const HomeScreen = ({ navigation }) => {
    const forumSeguidos = [
        {
            forumID: "123",
            forumName: "Teste1",
            forumDesc: "Teste1 para Descrição",
        },
        {
            forumID: "465",
            forumName: "Teste2",
            forumDesc: "Tesste2 p/ descrição",
        }
    ];

    const forumDono = [
        {
            forumID: "452",
            forumName: "Teste1",
            forumDesc: "Teste1 para Descrição",
        }
    ]

    const isDev = true

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
            <View style={styles.container}>
            <Text style={styles.pageTitle}>Fórum Seguidos</Text>    
            {_sectionForumList(forumDono, vForumDono)}
            <Text style={styles.pageTitle}>Fórum Seguidos</Text>
                        {_sectionForumList(forumSeguidos, vForumSeguidos, {flex: 2})}
                        </View>
            {/* <View style={styles.container}>
                {(forumDono ? 
                    <>
                        <Text style={styles.pageTitle}>Fórum Seguidos</Text>    
                        {_sectionForumList(forumDono, vForumDono)}
                    </>
                : null)}

                {(forumSeguidos ? 
                    <>
                        <Text style={styles.pageTitle}>Fórum Seguidos</Text>
                        {_sectionForumList(forumSeguidos, vForumSeguidos, {flex: 2})}
                    </>
                : null)}
            </View> */}
            
        </SafeAreaView>
    )
}


function _sectionForumList(list, funcCard, flex = {flex: 1}) {
    return (
        <FlatList 
                style={{height: "auto", marginBottom: 40}}
                scrollEnabled={false}
                data={list}
                keyExtractor={(item) => item?.forumID}
                
                renderItem={({ item }) => funcCard(item) }
            />
        
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
                            style={{ paddingVertical: 5, paddingLeft: 10}}
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





const colors = {
    p1: '#5D90D6',
    p2: '#163690',
    p3: "#071934",
    p5: "#B88CB4",
    p6: "#F2F2F2",
    text: '#000000',
    background: '#FFFFFF',
    overlayBackground: 'rgba(200, 200, 200, 0.4)',
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        padding: 20,
    },
    pageTitle: {
        width: "100%",
        marginBottom: 40,
        // Texto:
        fontFamily: "Roboto Mono",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1.25,
        textTransform: "uppercase",
        color: colors.p2,
        // underline:
        borderBottomWidth: 2,
        borderBottomColor: colors.p2,
        paddingBottom: 5,
    },
})

const forumSeguidosStyles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        backgroundColor: colors.p6,
        borderRadius: 10,
        marginBottom: 10,
        gap: 10,
        // Shadow:
        elevation: 6,
    },
    title: {
        color: colors.text,
        fontFamily: "Roboto Mono",
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 1.25,
    },
    desc: {
        color: colors.p3,
        opacity: 0.8,
        fontFamily: "Roboto",
        fontSize: 14,
        letterSpacing: 1.25,
    }
})

const forumDonoStyles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        backgroundColor: colors.p6,
        borderRadius: 10,
        marginBottom: 10,
        gap: 10,
        // Shadow:
        elevation: 6,
    },
    title: {
        color: colors.text,
        fontFamily: "Roboto Mono",
        fontWeight: "bold",
        fontSize: 20,
        letterSpacing: 1.25,
        textAlignVertical: "center"
    },
    rows: {
        flexDirection: "row", 
        justifyContent: "space-between"
    },
    extra: {
        color: colors.p3,
        fontFamily: "Roboto",
        fontSize: 16,
        letterSpacing: 1.25,
        opacity: .7,
    }
})

export default HomeScreen