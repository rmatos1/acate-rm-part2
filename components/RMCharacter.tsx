import { SafeAreaView, View, Text, FlatList, Pressable, Image, StyleSheet, Modal } from "react-native";
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
    
                        <Image style={styles.imgModal} source={{ uri: selectedCharacter.image }} />
    
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
                            <Text style={styles.text}>Close Modal</Text>
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
                style={styles.card}
                onPress={() => showDetails(item.id)}
            >

                <View style={[styles.image, styles.imageBox]}>

                    <Image 
                        style={styles.image} 
                        source={{ uri: item.image }}
                    />

                </View>
                
                <View style={styles.textBox}>

                    <Text style={styles.textName}>{ item.name }</Text>

                    <Text style={styles.text}>{ item.species }</Text>

                    <Text style={styles.text}>{ item.gender }</Text>

                </View>

                <Text style={styles.link}>View More</Text>

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
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 1,
        shadowOpacity: .1,
        shadowRadius: 3,
        padding: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    imageBox: { 
        elevation: 2,
        shadowOpacity: .15,
        shadowRadius: 5
    },
    textBox: {
        flex: 1,
        paddingLeft: 15
    },
    textName: {
        color: '#545454',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        color: '#868686',
        fontSize: 15
    },
    link: {
        fontSize: 11,
        color: '#939393',
        position: 'absolute',
        right: 8,
        bottom: 8,
        textDecorationLine: 'underline'
    },
    imgModal: {
        width: '100%',
        flex: 1,
        objectFit: 'cover',
        elevation: 1,
        shadowOpacity: .1,
        shadowRadius: 3
    },
    label: {
        color: '#868686',
        fontSize: 16,
        fontWeight: 'bold',
        width: 100
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