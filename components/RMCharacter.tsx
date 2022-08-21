import { SafeAreaView, View, Text, FlatList, Pressable, Image, StyleSheet, Modal, ImageBackground } from "react-native";
import { useState, useEffect } from "react";

import Api from "../services/Api";

import { ICharacter, ISelectedCharacter } from "../types";

const RMCharacter = () => {

    const [character, setCharacter] = useState<ICharacter[]>();

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedCharacter, setSelectedCharacter] = useState<ISelectedCharacter>();

    useEffect(() => {

        Api.get('character')
        .then(res => setCharacter(res.data.results))
    }, [])

    const renderDescription = (label: string, description: string) => {

        return(
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                <Text style={styles.label}>{ label }:</Text>

                <Text style={styles.text}>{ description }</Text>

            </View>
        )
    }

    const modal = () => {

        if(selectedCharacter) {

            return(
                <Modal
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                    visible={modalVisible}
                >
    
                    <View style={{ flex: 1 }}>
    
                        <Image style={[styles.imgModal, styles.shadow]} source={{ uri: selectedCharacter.image }} />
    
                        <View style={{ padding: 15, flex: 1 }}>

                            { renderDescription('Name', selectedCharacter.name) }

                            { renderDescription('Species', selectedCharacter.species) }
                            
                            { renderDescription('Status', selectedCharacter.status) }

                            { renderDescription('Gender', selectedCharacter.gender) }

                            { renderDescription('Location', selectedCharacter.location.name) }

                            { renderDescription('Origin', selectedCharacter.origin.name) }

                        </View>

                        <Pressable 
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ fontSize: 15, color: '#939393' }}>Return</Text>
                        </Pressable>

                    </View>
    
                </Modal>
            )
        }
        
        return null;
    }

    const showDetails = (id: number) => {

        const value: any = character?.find(item => item.id === id);

        setSelectedCharacter(value);
        setModalVisible(true);
    }

    const _renderItem = (item: any) => {

        return(
            <Pressable
                style={[styles.card, styles.shadow]}
                onPress={() => showDetails(item.id)}
            >

                <ImageBackground 
                    style={styles.imageBg}
                    imageStyle={{ borderRadius: 10 }}
                    source={{ uri: item.image }}
                >

                    <View style={styles.textBox}>

                        <Text style={styles.textName}>{ item.name }</Text>

                        <Text style={styles.link}>View More</Text>

                    </View>

                </ImageBackground>

            </Pressable>
        )
    }

    return(
        <SafeAreaView style={styles.safeArea}>

            { modal() }

            <FlatList 
                contentContainerStyle={styles.container}
                data={character}
                renderItem={({ item }) => _renderItem(item)}
                keyExtractor={(item: any) => item.id}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    container: {
        flexGrow: 1,
        paddingVertical: 40,
        paddingHorizontal: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
        marginBottom: 20
    },
    imageBg: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-end'
    },
    shadow: { 
        elevation: 2,
        shadowOpacity: .1,
        shadowRadius: 3
    },
    textBox: {
        minHeight: 35,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, .45)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    textName: {
        color: '#fff',
        fontSize: 17,
        flex: 1,
        paddingRight: 5
    },
    link: {
        fontSize: 12,
        color: '#f5f5f5',
        textDecorationLine: 'underline'
    },
    imgModal: {
        width: '100%',
        flex: 1,
        objectFit: 'cover'
    },
    label: {
        color: '#868686',
        fontSize: 16,
        fontWeight: 'bold',
        width: 100
    },
    text: {
        color: '#909090',
        fontSize: 16,
        flex: 1
    },
    closeButton: { 
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5' 
    }
})

export default RMCharacter;