import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity, Image} from 'react-native';
import { InlineWidget } from "react-calendly";


const ScheduleAppointment = () =>
{
    

    return (
        <View style={styles.background}>
            <Text style={styles.header}>UNO Computer Science Tutor Center</Text>

            <Text style={styles.joinQueue} >Schedule An Appointment</Text>
            <Text style={styles.joinQueue} >Tutor: Jared Wise</Text>
            {/*Calendly inline widget begin
                <div class="calendly-inline-widget" data-url="https://calendly.com/tutorcentertest" style="min-width:320px;height:630px;">
                    <InlineWidget url= "https://calendly.com/tutorcentertest"/>
                </div>
                <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
            {/*Calendly inline widget end */}

            <InlineWidget
            iframeTitle="Calendly Scheduling Page"
            pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideGdprBanner: true,
                hideLandingPageDetails: false,
                primaryColor: '00a2ff',
                textColor: '4d5055'
            }}
            prefill={{
                customAnswers: {
                a1: 'a1',
                a10: 'a10',
                a2: 'a2',
                a3: 'a3',
                a4: 'a4',
                a5: 'a5',
                a6: 'a6',
                a7: 'a7',
                a8: 'a8',
                a9: 'a9'
                },
                date: new Date('2023-03-31T23:48:06.952Z'),
                email: 'test@test.com',
                firstName: 'Jon',
                guests: [
                'janedoe@example.com',
                'johndoe@example.com'
                ],
                lastName: 'Snow',
                name: 'Jon Snow'
            }}
            styles={{
                height: '600px',
                width: '1000px'
            }}
            url="https://calendly.com/tutorcentertest"
            utm={{
                utmCampaign: 'Spring Sale 2019',
                utmContent: 'Shoe and Shirts',
                utmMedium: 'Ad',
                utmSource: 'Facebook',
                utmTerm: 'Spring'
            }}
            />

        </View>
    );
};

const styles = StyleSheet.create
({
    header: {
        fontSize: 52,
        fontWeight: "bold",
        //backgroundColor: "#F5FCFF",
        textAlign: "center",
        color: "#293C7D",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    joinQueue: {
        fontSize: 32,
        fontWeight: "bold",
        //backgroundColor: "#F5FCFF",
        textAlign: "center",
        color: "#293C7D",
    },

    
    buttonContainer:{
        backgroundColor: "#005CA6",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      aboutImg:{
        width: 30,
        height: 30
      },
      aboutContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120
        
      },
      aboutText:{
        fontSize: 20
      },
    
    nextPage:{
        color: "#FFFFFF",
        fontSize: 16,
    },

    footing:{
      textAlign: 'center',
      marginTop: 30,
      backgroundColor: "#F5FCFF",
    },

    background:{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        
    }

});


export default ScheduleAppointment;