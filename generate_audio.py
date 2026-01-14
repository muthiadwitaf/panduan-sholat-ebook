import asyncio
import edge_tts
import os

VOICE = "ar-SA-HamedNeural" 

DATA = {
    #data gerakan sholat
    "takbiratul_ihram": "الله أكبر",
    "al_fatihah": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ. ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. مَٰلِكِ يَوْمِ ٱلدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ. صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّالِّينَ",
    "rukuk": "سُبْحَانَ رَبِّىَ الْعَظِيمِ وَبِحَمْدِهِ",
    "itidal": "سَمِعَ اللهُ لِمَنْ حَمِدَهُ رَبَّنَا لَكَ الْحَمْدُ",
    "sujud": "سُبْحَانَ رَبِّىَ الأَعْلَى وَبِحَمْدِهِ",
    "duduk_diantara_dua_sujud": "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
    "tahiyat_akhir": "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِىُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
    "salam": "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ",
    
    #niat sholat (sample sholat subuh)
    "niat_sholat_subuh": "أُصَلِّى فَرْضَ الصُّبْح رَكَعتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لله تَعَالَى",

    #doa harian
    "Doa Bangun Tidur": "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    "Doa Sebelum Tidur": "بِسْمِكَ اللّهُمَّ أَحْيَا وَبِسْمِكَ أَمُوتُ",
    "Doa Sebelum Makan": "الْلَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    "Doa Sesudah Makan": "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    "Doa Masuk Rumah": "بِسْمِ اللهِ وَلَجْنَا، وَ بِسْمِ اللهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا"
}

OUTPUT_DIR = "assets/audio"

async def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    print(f"Generating audio files in '{OUTPUT_DIR}' using voice '{VOICE}'...")
    
    for name, text in DATA.items():
        filename = name.lower().replace(" ", "_").replace("’", "").replace("'", "") + ".mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        print(f"Talking: {filename}...")
        try:
            communicate = edge_tts.Communicate(text, VOICE, rate="-10%")
            await communicate.save(filepath)
        except Exception as e:
            print(f"Error generating {filename}: {e}")

    print("All audio files generated successfully.")

if __name__ == "__main__":
    asyncio.run(main())

