import { 
    Text, 
    View, 
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Pressable,
    ScrollView,
    Image,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import {styles, forumSeguidosStyles, forumDonoStyles } from "./styles";
import PropTypes from "prop-types";
import { useAuth } from "../../components/contexts/AuthContext";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../service/firebase/conexao";
import forumList from "../../../hooks/forum/forumList";
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from "../../../utils/colors";
import { deconvertBase64ToImage } from "../../../utils/Base64Image";


export default function HomeScreen({ navigation }) {

<<<<<<< Updated upstream
    const [forumSeguidos, setForumSeguidos] = useState([])
    const [forumDono, setForumDono] = useState([])
    const [isDev, setIsDev] = useState(false)
    const [loading, setLoading] = useState(true)
=======
  
  // User:
  const { user, userLoading, authLoading } = useAuth();
  // > Verificação:
>>>>>>> Stashed changes

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
                    
                    if(data.cargo) {
                        setIsDev(Boolean(data.cargo))

                        const snapForuns = await forumList({ qUserRef: userRef })
                        
                        if(snapForuns && snapForuns.length > 0) { 
                            setForumDono(snapForuns)
                        }
                    }

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


<<<<<<< Updated upstream
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
                            <ScrollView>
                                {(isDev && forumDono && forumDono.length > 0 ? 
                                    <>
                                        <Text style={styles.pageTitle}>{titleForumDono}</Text>    
                                        <FlatList 
                                            style={styles.section}
                                            scrollEnabled={false}
                                            data={forumDono}
                                            keyExtractor={(item) => item.forumID}
                                            
                                            renderItem={({ item }) => <VForumDono {...item} /> }
                                        />
                                    </>
                                : null)}

                                {(forumSeguidos && forumSeguidos.length > 0 ? 
                                    <>
                                        <Text style={styles.pageTitle}>{titleForumSeguidos}</Text>
                                        <FlatList 
                                            style={styles.section}
                                            scrollEnabled={false}
                                            data={forumSeguidos}
                                            keyExtractor={(item) => item.forumID}
                                            
                                            renderItem={({ item }) => <VForumSeguidos {...item} />}
                                        />
                                    </>
                                : null)}
                            </ScrollView>
                        </View>
                        {isDev ?
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


function VForumSeguidos({forumID, forumName, forumDesc}) {
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

function VForumDono({ forumID, avatar, forumName, data }) {
    if(!forumName && typeof forumName !== 'string') return;
    if(!forumID) return;
    if(!(data instanceof Timestamp)) return;


    return (
        <Pressable
            onPress={(e) => Alert.alert(`Olá ${forumID}`)} >
                <View style={forumDonoStyles.container}>
                    <View style={forumDonoStyles.rows}>
                        <Image source={deconvertBase64ToImage(avatar)} style={forumDonoStyles.avatar}/>
                        <Text style={forumDonoStyles.title}>{forumName}</Text>
                        <Pressable
                            style={forumDonoStyles.iconEdit}
                            onPress={(e) => {
                                navigation.push('ConfigurarForum', {
                                    forumID: forumID,
                                })
                            }} >
                                <Ionicons name="settings" size={24} color={colors.p3} />
                        </Pressable>
                    </View>
                    <View style={[forumDonoStyles.rows, {justifyContent: 'flex-end'}]}>
                        {data && <Text style={forumDonoStyles.extra}>{data.toDate().toLocaleDateString("pt-br")}</Text>}
                    </View>
                </View>
        </Pressable>
    )
=======
  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loadingScreen}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : forumDono.length > 0 || forumSeguidos.length > 0 ? (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <ScrollView>
              {isDev && forumDono && forumDono.length > 0 ? (
                <>
                  <Text style={styles.pageTitle}>{titleForumDono}</Text>
                  <FlatList
                    style={styles.section}
                    scrollEnabled={false}
                    data={forumDono}
                    keyExtractor={(item) => item.forumID}
                    renderItem={({ item }) => <VForumDono navigation={navigation} path={item.getForumPath()} {...item} />}
                  />
                </>
              ) : null}

              {forumSeguidos && forumSeguidos.length > 0 ? (
                <>
                  <Text style={styles.pageTitle}>{titleForumSeguidos}</Text>
                  <FlatList
                    style={styles.section}
                    scrollEnabled={false}
                    data={forumSeguidos}
                    keyExtractor={(item) => item.forumID}
                    renderItem={({ item }) => <VForumSeguidos navigation={navigation} path={item.getForumPath()} {...item} />}
                  />
                </>
              ) : null}
            </ScrollView>
          </View>
          {isDev ? (
            <TouchableOpacity
              onPress={(e) => navigation.push('ConfigurarForum')}
              style={styles.button}
            >
              <Text style={styles.buttonTxt}>Criar Novo Fórum</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <View style={styles.loadingScreen}>
          <Text style={styles.loadingText}>
            Clique em explorar para começar
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

function VForumSeguidos({ forumID, forumName, forumDesc, path, navigation }) {
  if (!forumName && typeof forumName !== 'string') return;
  if (!forumDesc && typeof forumDesc !== 'string') return;
  if (typeof path !== 'string') return;
  if (!forumID) return;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push('Forum', {
      forumID: forumID,
      forumPath: path,
    })}>
      <View style={forumSeguidosStyles.container}>
        <Text style={forumSeguidosStyles.title}>{forumName}</Text>
        <Text style={forumSeguidosStyles.desc}>{forumDesc}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function VForumDono({ forumID, avatar, forumName, data, path, navigation }) {
  if (!forumName && typeof forumName !== 'string') return;
  if (!forumID) return;
  if (!(data instanceof Timestamp)) return;
  if (typeof path !== 'string') return;

  return (
    <Pressable onPress={(e) => navigation.push('Forum', {
      forumID: forumID
    })}>
      <View style={forumDonoStyles.container}>
        <View style={forumDonoStyles.rows}>
          <Image
            source={deconvertBase64ToImage(avatar)}
            style={forumDonoStyles.avatar}
          />
          <Text style={forumDonoStyles.title}>{forumName}</Text>
          <Pressable
            style={forumDonoStyles.iconEdit}
            onPress={(e) => {
              navigation.push('ConfigurarForum', {
                forumID: forumID,
              });
            }}
          >
            <Ionicons name="settings" size={24} color={colors.p3} />
          </Pressable>
        </View>
        <View style={[forumDonoStyles.rows, { justifyContent: 'flex-end' }]}>
          {data && (
            <Text style={forumDonoStyles.extra}>
              {data.toDate().toLocaleDateString('pt-br')}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
>>>>>>> Stashed changes
}


HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

