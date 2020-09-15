import React, { useEffect, useState } from 'react';
import YapilacakIsler from './src/pages/YapilacakIsler';
import { DbOpen, db } from './src/Database/AnaScript';
import { SafeAreaView } from 'react-native';


const App = () => {
  const [islemTamamlandiMi, IslemTamamlandiMiAcKapa] = useState(false)

  useEffect(() => {
    async function DbBaslatmaIsleminiCalistir() {
      await DbOpen()
      IslemTamamlandiMiAcKapa(true)
    }
    DbBaslatmaIsleminiCalistir()
  }, []);

  return (
    islemTamamlandiMi ?
      <SafeAreaView>
        <YapilacakIsler />
      </SafeAreaView>
      :
      <></>
  );
};

export default App;
