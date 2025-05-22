import { Image } from "expo-image";
import { 
    useEffect, 
    useRef, 
    useState 
} from "react";
import { 
    Animated, 
    Pressable, 
    Text, 
    TouchableOpacity, 
    View 
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from "./styles";
import PropTypes from "prop-types";
import Forum from "../../../../model/Forum";
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../../service/firebase/conexao";


export default function VForumHeader({
    uid,
    forum,
    forumAutor,
    segID,
}) {
    const [open, setOpen] = useState(false)
    const [seguidor, setSeguidor] = useState(segID ?? '')
    const [loadingSeguir, setLoadingSeguir] = useState(false)

    const [heightRef, setHeightRef] = useState(0);
    const animHeight = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if(heightRef > 0) {
            Animated.timing(animHeight, {
                toValue: open ? heightRef : 0,
                duration: 300,
                useNativeDriver: false,
            }).start(); 
        }
    }, [open])

    async function handleSeguir() {    
        try {
            setLoadingSeguir(true)
            
            const isSeguidor = (seguidor !== '')
            const userDoc = doc(db, "usuarios", uid)     
            const segDoc = seguidor !== '' ? 
                doc(db, "seguidores", seguidor) 
                : doc(collection(db, "seguidores"));

            const promises = isSeguidor ?
                [
                setDoc(userDoc, { 
                    seguindo: arrayRemove(forum.forumID),
                }, { merge: true }),

                deleteDoc(segDoc)
                ] 
                : [
                setDoc(userDoc, { 
                    seguindo: arrayUnion(forum.forumID),
                }, { merge: true}),

                setDoc(segDoc, { 
                    userRef: uid, 
                    forumRef: forum.forumID,
                    data: serverTimestamp(),
                    }
                )
                ];

            await Promise.all(promises)

            setSeguidor(isSeguidor ? 
                '' 
                : segDoc.id
            )
        } catch(err) {
            console.error(err)
        } finally {
            setLoadingSeguir(false);
        }
    }


    return (
        <View style={styles.header}>
            <View style={styles.forumPrincipal}>
                <Image 
                    source={''}
                    style={styles.forumAvatar}
                />
                <View>
                    <Text style={styles.forumTitle}>
                        {forum.forumName}
                    </Text>
                    <Text style={styles.forumAutor}>
                        Por: {forumAutor}
                    </Text>
                    {!open && (
                        <Pressable 
                            onPress={() => setOpen(!open)}>
                                <Text style={styles.forumExpansor}>
                                    ...
                                </Text>
                        </Pressable>
                    )}
                </View>
            </View>
            
            <Animated.View 
                style={{height: animHeight, overflow: 'hidden'}}>
                    <View 
                     style={styles.forumDescView}
                    onLayout={(e) => {
                        setHeightRef(e.nativeEvent.layout.height)
                    }}>
                        <Text style={styles.forumDesc}>
                            {forum.forumDesc}
                        </Text>

                        <Pressable 
                            onPress={() => setOpen(!open)}>
                                <Text style={styles.forumExpansor}>
                                    ...
                                </Text>
                        </Pressable>

                        <TouchableOpacity
                            style={[
                                styles.forumSeguir,
                                (seguidor !== '') && styles.forumSeguido,
                                loadingSeguir && styles.loadingOverlay
                            ]}
                            disabled={loadingSeguir}
                            onPress={() => handleSeguir()}>
                                <Ionicons
                                    name={(seguidor === '') ? 'add' : 'close'}
                                    size={20}
                                    style={[
                                        styles.forumSeguirItem,
                                        (seguidor !== '') && styles.forumSeguidoItem
                                    ]}
                                />
                                <Text 
                                    style={[
                                        styles.forumSeguirItem,
                                        (seguidor !== '') && styles.forumSeguidoItem
                                    ]}>
                                    {(seguidor === '') ? "Seguir" : "Parar de Seguir"}
                                </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
        </View>
    )
}


VForumHeader.propTypes = {
    uid: PropTypes.string.isRequired,
    forum: PropTypes.instanceOf(Forum).isRequired,
    forumAutor: PropTypes.string.isRequired,
    segID: PropTypes.string,
}