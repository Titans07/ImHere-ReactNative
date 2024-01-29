import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import { styles } from './styles'

import { Participant } from '../../components/Participant'

export default function Home(){
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticiapntAdd(){
        if(participants.includes(participantName)){
            return Alert.alert("Participante Existe", "Já existe um participante com esse nome")
        }
        setParticipants(previState => [...previState, participantName])
        setParticipantName('')
    }

    function handleParticiapntRemove(name: string){
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            },
        ])

        console.log(`Você Removeu ${name}`)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                ImHere
            </Text>

            <Text style={styles.eventDate}>
                Sexta, 4 de Novembro de 2022
            </Text>

            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor="#6b6b6b"
                    onChangeText={setParticipantName}
                    value={participantName}
                />
                <TouchableOpacity style={styles.button} onPress={handleParticiapntAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={participants} 
                keyExtractor={item => item} 
                renderItem={({item}) => (
                    <Participant key={item} name={item} onRemove={() => handleParticiapntRemove(item)}/>
                )} 
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione um participante
                    </Text>
                )}
            />

        </View>
    )
}