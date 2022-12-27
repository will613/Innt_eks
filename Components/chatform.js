import React from 'react';
import { View, Text } from 'react-native';

const ChatScreen = () => {
    return (
        <View>
            <Text>Chat Screen</Text>
        </View>
    );
};

export default ChatScreen;

import React, { useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    const onSend = (newMessages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    };

    return (
        <View>
            <GiftedChat
                messages={messages}
                onSend={(newMessages) => onSend(newMessages)}
                user={{
                    _id: 1,
                }}
            />
        </View>
    );
};

export default ChatScreen;