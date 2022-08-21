import { SafeAreaView, View, Text, FlatList, Pressable, StyleSheet, ImageBackground } from "react-native";
import { useState, useEffect, useContext } from "react";

import Api from "../services/Api";
import { ModalVisibility } from "./ModalVisibilityContext";
import ModalDetailsCharacter from "./ModalDetailsCharacter";

import { ICharacter, ISelectedCharacter } from "../types";

const RMCharacter = () => {

    const [character, setCharacter] = useState<ICharacter[]>();

    const [selectedCharacter, setSelectedCharacter] = useState<ISelectedCharacter>();

    const context = useContext(ModalVisibility);

    useEffect(() => {

        Api.get('character')
        .then(res => setCharacter(res.data.results))
    }, [])

    const showDetails = (id: number) => {

        const value: any = character?.find(item => item.id === id);

        setSelectedCharacter(value);
        context.toggleVisibility(true);
    }

    const _renderItem = (item: any) => {

        return(
            <Pressable
                style={styles.card}
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

            <ModalDetailsCharacter data={selectedCharacter} />

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
        marginBottom: 20,
        elevation: 2,
        shadowOpacity: .1,
        shadowRadius: 3
    },
    imageBg: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-end'
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
    }
})

export default RMCharacter;