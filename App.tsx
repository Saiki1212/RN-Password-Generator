import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as YUP from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const UserPassword = YUP.object().shape({
  PasswordLength : YUP.number()
  .min(5, 'Minimum 5 characters')
  .max(16, 'Max of 16 characters')
  .required('Length must Required')
})

export default function App() {
  const [OldPassword, settingPassword] = useState('')
  const [IsPassworddone, setIsPassworddone] = useState(false)

  const [Lowercase, setLowercase] = useState(true)
  const [Uppercase, setUppercase] = useState(false)
  const [number, UseNumber] = useState(false)
  const [Symbol, UseSymbols] = useState(false)

  const GeneratePassword = (PasswordLength: number) => {
    let CharacterList = ''
    const UpperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LowerCaseChar = 'abcdefghijklmnopqrstuvwxyz'
    const Digits = '0123456789'
    const Symbols = '!@#$%^&*_-+='

    if(Lowercase)
      CharacterList += LowerCaseChar

    if(Uppercase)
      CharacterList += UpperCaseChar
    
    if(number)
      CharacterList += Digits

    if(Symbol)
      CharacterList += Symbols

    const FinalPassword = CreatePassword(CharacterList, PasswordLength)
    settingPassword(FinalPassword)
    setIsPassworddone(true)

  }

  const CreatePassword = (characters: string, PasswordLength: number) => {
    let result = ''
    for(let i=0; i<PasswordLength; i++) {
      const CharIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(CharIndex)
    }
    return result
  }

  const ResetPassword = () => {
    settingPassword('')
    setIsPassworddone(false)
    setLowercase(true)
    setUppercase(false)
    UseNumber(false)
    UseSymbols(false)
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.Container}>
          <Text style={styles.Header}>Password Generator</Text>
          <Formik
            initialValues={{PasswordLength: ''}}
            validationSchema={UserPassword}
            onSubmit={values => {
              console.log(values);
              GeneratePassword(+values.PasswordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset
              /* and other goodies */
            }) => (
              <>
                
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.AllText}>PassWord Length</Text>
                    {touched.PasswordLength && errors.PasswordLength && (
                      <Text style={styles.errorText}>
                        {errors.PasswordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                      style={styles.inputStyle}
                      value={values.PasswordLength}
                      onChangeText={handleChange('PasswordLength')}
                      placeholder='Ex: 8'
                      keyboardType='numeric'
                    />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.AllText}>Include LowerCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={Lowercase}
                    onPress={() => setLowercase(!Lowercase)}
                    fillColor='#F22B29'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.AllText}>Include UpperCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={Uppercase}
                    onPress={() => setUppercase(!Uppercase)}
                    fillColor='#00A7E1'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.AllText}>Include Number</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={number}
                    onPress={() => UseNumber(!number)}
                    fillColor='#F7A072'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.AllText}>Include Symbol</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={Symbol}
                    onPress={() => UseSymbols(!Symbol)}
                    fillColor='#2a9d8f'
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                      disabled={!isValid}
                      onPress={handleSubmit}
                      style={styles.btn1}
                  >
                      <Text style={styles.btnText1}>Generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btn2}
                      onPress={() => {
                        handleReset();
                        ResetPassword()
                      }}
                    >
                      <Text style={styles.btnText2}> Reset</Text>
                    </TouchableOpacity>
                </View>
                
              </>
            )}
          </Formik>
        </View>
        {IsPassworddone ? (
          <View style={styles.final1}>
            <View style={styles.Card}>
              <Text style={styles.t1}>Long press to copy</Text>
              <View style={styles.final2}>
                <Text style={styles.t2}>Password : </Text>
                <Text style={styles.t3} selectable={true}>{OldPassword}</Text>
              </View>
            </View>
          </View>
          
        ): null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '90%',
    height: 400,
    marginHorizontal: 20,
    borderWidth: 0.6,
    borderRadius: 8,
    marginTop: 60,
    backgroundColor: '#fffcf2'
  },
  Header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 15,
    marginTop: 20,
    color: '#03071e'
  },
  inputWrapper: {
    marginBottom: 20,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  AllText: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 10
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    margin: 8,
    padding: 8,
  },
  btn1: {
    width: 100,
    height: 40,
    backgroundColor: '#a8dadc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5
  },
  btn2: {
    width: 100,
    height: 40,
    backgroundColor: '#b5e2fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5
  },
  btnText1: {
    fontSize: 17,
    fontWeight: '800'
  },
  btnText2: {
    fontSize: 17,
    fontWeight: '800'
  },
  inputColumn: {
    marginTop: 10
  },
  inputStyle: {
    fontSize: 17,
    fontWeight: '400',
    marginRight: 10,
    width: 60,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 4,
    backgroundColor: '#cad2c5'
  },
  errorText: {
    fontSize: 12,
    marginHorizontal: 15,
    marginTop: 6,
    color: '#e63946',
    fontWeight: '400'
  },
  Card: {
    flex: 1,
    width: 250,
    height: 100,
    backgroundColor: '#8d99ae',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#8d99ae'
  },
  final1: {
    flex: 1,
    height: 120,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  final2: {
    flexDirection: 'row',
    
  },
  t1: {
    fontSize: 17,
    marginTop: -20,
    marginBottom: 20,
    fontWeight: '600'
  },
  t2: {
    fontSize: 18,
    fontWeight: '600'
  },
  t3: {
    fontSize: 20,
    fontWeight: '900',
    color: '#03045e',
    marginLeft: 5,
    marginTop: -3
  },
})