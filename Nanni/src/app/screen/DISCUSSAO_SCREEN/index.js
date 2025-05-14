import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Divider } from 'react-native-elements';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.forumTitle}>NOME DO FORUM</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>TITULO</Text>
          <Text style={styles.author}>AUTOR</Text>
          <View style={styles.tagContainer}>
            <Button title="Tag1" buttonStyle={styles.tagButton} containerStyle={styles.tagButtonContainer} />
            <Button title="Tag2" buttonStyle={styles.tagButton} containerStyle={styles.tagButtonContainer} />
          </View>
          <Text style={styles.postText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce erat ipsum
          </Text>
          <Text style={styles.date}>12/12/2012</Text>
        </View>

        <Divider style={styles.divider} />
        
        <Text style={styles.commentaryHeader}>COMENTÁRIOS</Text>
        

        <View style={styles.commentContainer}>
          <Text style={styles.commentAuthor}>AUTOR</Text>
          <Text style={styles.commentText}>Teste</Text>
          <Text style={styles.commentDate}>12/12/2012</Text>
        </View>

        <View style={styles.commentContainer}>
          <Text style={styles.commentAuthor}>AUTOR</Text>
          <Text style={styles.commentText}>Teste</Text>
          <Text style={styles.commentDate}>12/12/2012</Text>
        </View>

        <View style={styles.commentContainer}>
          <Text style={styles.commentAuthor}>AUTOR</Text>
          <Text style={styles.commentText}>Teste</Text>
          <Text style={styles.commentDate}>12/12/2012</Text>
        </View>
      </ScrollView>
    </View>
  );
};
