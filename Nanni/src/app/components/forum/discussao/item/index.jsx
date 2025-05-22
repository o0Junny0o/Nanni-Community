import { Timestamp } from "firebase/firestore"
import PropTypes from "prop-types"
import { 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native"
import { Ionicons } from '@expo/vector-icons';
import styles from "./styles"


export default function VDiscussaoItem({
  titulo,
  mensagem,
  tag,
  data,
  userIsDev,
  onDelete,
  onUpdate,
}) {


  return (
    <View style={styles.container}>
      <View style={styles.principal}>
        <View style={styles.titulosView}>
          <Text style={styles.titulo}>{titulo}</Text>
          {/* <Text style={styles.forumDescription}>
            AUTOR: {item?.mensagem}
          </Text> */}
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        </View>
        {userIsDev && (
          <View style={styles.iconsView}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onDelete()
              }}
            >
              <Ionicons 
                name="trash" 
                size={20}
                style={styles.removeIcon}/>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onUpdate();
              }}
            >
              <Ionicons 
                name="pencil" 
                size={20}
                style={styles.editIcon}/>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text
        style={styles.tag}
      >
        {tag}
      </Text>

      
      {(data instanceof Timestamp) && (
        <Text style={styles.date}>
          {data.toDate().toLocaleDateString("pt-BR")}
        </Text>
      )}
    </View>
  )
}

VDiscussaoItem.propTypes = {
  titulo: PropTypes.string.isRequired,
  mensagem: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  userIsDev: PropTypes.bool.isRequired,
  // Callback  
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}