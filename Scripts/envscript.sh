#!/usr/bin/env bash
USED_COLOR="$1"
TYPE_OF_OPERATION="$2" # typeOfOperation : setup, build, keystore, setupWithBuild, setupWithKeystore, buildWithKeystore, 
VERSION_TYPE="$3" # versionType : major, minor, code, majorWithCode, minorWithCode, none, reset.
FIREBASE_PATH="Scripts/Configs/Firebase/${ENV}"
NATIVE_PATH="Scripts/Configs/Native/${ENV}"
ASSETS_PATH="Scripts/Configs/Native/${ENV}/Assets"
INFO_PLIST_PATH=ios/ReactNativeStructure

# Color Code'
Red=''
Green=''
Yellow=''
Blue=''    
Purple=''
Pink=''
LightGreen=''
None=''
Other='##[warning]'
if [[ "$USED_COLOR" == "true" ]]; then
  Red=$'\e[38;5;196m'
  Green=$'\e[38;5;49m'
  Yellow=$'\e[38;5;220m'
  Blue=$'\e[38;5;39m'    
  Purple=$'\e[38;5;105m'
  Pink=$'\e[38;5;200m'
  LightGreen=$'\e[38;5;82m'
  None=$'\e[0m'
  Other=''
fi

lazygit() {
    git add .
    git commit -a -m "$1"
    git push
}

repeat() {
	local start=1
	local end=${1:-80}
	local str="${2:-=}"
  i=$start
  while [ $i -le $end ]
  do
    printf "${str}"
    ((i++))
  done
}

echoHeader() {
  termwidth="$(tput cols)"
  stringWidth=$(echo "$2" | wc -m)
  termswidth=$((termwidth-stringWidth))
  printf "${Other}${Yellow}|"
  repeat $(((termswidth-2-${#1})/2)) "$1"
  printf "$3%s${Yellow}" "$2"
  repeat $(((termswidth-1-${#1})/2)) "$1"
  printf "|\n"
}

echoHeaderValue() {
  termwidth="$(tput cols)"
  termswidth=$((termwidth-50))
  printf "${Other}${Yellow}| ${None}${Red}%-40s ${LightGreen}:-${None} %-*s ${Yellow}|${None}\n" "$1" $termswidth "$2"
}

echoHeader "-" "-" "${Yellow}"
echoHeader " " "Applying project setting" "${Green}"
echoHeader "-" "-" "${Yellow}"
echoHeaderValue "Version Type" $VERSION_TYPE
echoHeaderValue "Type Of Operation" $TYPE_OF_OPERATION
echoHeaderValue "Firebase Dir" $FIREBASE_PATH
echoHeaderValue "Native Dir" $NATIVE_PATH
echoHeader "-" "-" "${Yellow}"

if [[ "$TYPE_OF_OPERATION" == "setup" || "$TYPE_OF_OPERATION" == "setupWithBuild" || "$TYPE_OF_OPERATION" == "setupWithKeystore" ]]; then
  echoHeader " " "Please wait while switching to $ENV environment" "${Pink}"
  echoHeader "-" "-" "${Yellow}"
  echoHeader " " "Change android platform setting" "${Blue}"
  echoHeader "-" "-" "${Yellow}"
  
  # Copy or replace android icon files
  if [ -f "${ASSETS_PATH}/mipmap-mdpi/ic_launcher.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/mipmap-mdpi/ic_launcher.png" ../app/src/main/res/mipmap-mdpi
    echoHeaderValue "Change ic_launcher png file" "../app/src/main/res/mipmap-mdpi/ic_launcher.png"
  else
    echoHeaderValue "Change ic_launcher png file" "${ASSETS_PATH}/mipmap-mdpi/ic_launcher.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/mipmap-hdpi/ic_launcher.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/mipmap-hdpi/ic_launcher.png" ../app/src/main/res/mipmap-hdpi
    echoHeaderValue "Change ic_launcher png file" "../app/src/main/res/mipmap-hdpi/ic_launcher.png"
  else
    echoHeaderValue "Change ic_launcher png file" "${ASSETS_PATH}/mipmap-hdpi/ic_launcher.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/mipmap-xhdpi/ic_launcher.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/mipmap-xhdpi/ic_launcher.png" ../app/src/main/res/mipmap-xhdpi
    echoHeaderValue "Change ic_launcher png file" "../app/src/main/res/mipmap-xhdpi/ic_launcher.png"
  else
    echoHeaderValue "Change ic_launcher png file" "${ASSETS_PATH}/mipmap-xhdpi/ic_launcher.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/mipmap-xxhdpi/ic_launcher.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/mipmap-xxhdpi/ic_launcher.png" ../app/src/main/res/mipmap-xxhdpi
    echoHeaderValue "Change ic_launcher png file" "../app/src/main/res/mipmap-xxhdpi/ic_launcher.png"
  else
    echoHeaderValue "Change ic_launcher png file" "${ASSETS_PATH}/mipmap-xxhdpi/ic_launcher.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/mipmap-xxxhdpi/ic_launcher.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/mipmap-xxxhdpi/ic_launcher.png" ../app/src/main/res/mipmap-xxxhdpi
    echoHeaderValue "Change ic_launcher png file" "../app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"
  else
    echoHeaderValue "Change ic_launcher png file" "${ASSETS_PATH}/mipmap-xxxhdpi/ic_launcher.png file not found!"
  fi

  # Copy or replace android config file
  if [ -f "${FIREBASE_PATH}/google-services.json" ]; then
    yes | cp -rf "${FIREBASE_PATH}/google-services.json" android/app
    echoHeaderValue "Change google-service json file" "android/app/google-services.json"
  else
    echoHeaderValue "Change google-service json file" "${FIREBASE_PATH}/google-services.json file not found!"
  fi
  if [ -f "${NATIVE_PATH}/appcenter-config.json" ]; then
    yes | cp -rf "${NATIVE_PATH}/appcenter-config.json" android/app/src/main/assets
    echoHeaderValue "Change appcenter-config json file" "android/app/src/main/assets/appcenter-config.json"
  else
    echoHeaderValue "Change appcenter-config json file" "${NATIVE_PATH}/appcenter-config.json file not found!!"
  fi

  # Get android setting string
  ANDROID_JSON_DATA=$(cat ${NATIVE_PATH}/android-string.json)
  ANDROID_APP_NAME=$(echo $ANDROID_JSON_DATA | python -c "import sys, json; print json.load(sys.stdin)['appName']")
  ANDROID_CODEPUSH_KEY=$(echo $ANDROID_JSON_DATA | python -c "import sys, json; print json.load(sys.stdin)['codePushKey']")
  
  # Get string.xml path
  STRING_XML_PATH=android/app/src/main/res/values/strings.xml
  TEMP_STRING_XML_PATH=${STRING_XML_PATH}.txt
  
  # Change app name in string.xml
  if [ ! -z "$ANDROID_APP_NAME" -a "$ANDROID_APP_NAME" != " " ]; then
    cat ${STRING_XML_PATH} | sed "s/<string name=\"app_name\">.*<\/string>/<string name=\"app_name\">${ANDROID_APP_NAME}<\/string>/" > ${TEMP_STRING_XML_PATH}
    cat ${TEMP_STRING_XML_PATH} | sed "s/APP_VERSION_NAME/${ANDROID_APP_NAME}/" > ${STRING_XML_PATH}
    echoHeaderValue "Android app name" $ANDROID_APP_NAME
  else
    echoHeaderValue "Android app name" "${NATIVE_PATH}/android-string.json in appName key not available!"
  fi

  # Change code push key
  if [ ! -z "$ANDROID_CODEPUSH_KEY" -a "$ANDROID_CODEPUSH_KEY" != " " ]; then
    cat ${STRING_XML_PATH} | sed "s/<string name=\"CodePushDeploymentKey\" moduleConfig=\"true\">.*<\/string>/<string name=\"CodePushDeploymentKey\" moduleConfig=\"true\">${ANDROID_CODEPUSH_KEY}<\/string>/" > ${TEMP_STRING_XML_PATH}
    cat ${TEMP_STRING_XML_PATH} | sed "s/APP_VERSION_NAME/${ANDROID_CODEPUSH_KEY}/" > ${STRING_XML_PATH}
    echoHeaderValue "Android codepush key" $ANDROID_CODEPUSH_KEY
  else
    echoHeaderValue "Android codepush key" "${NATIVE_PATH}/android-string.json in codePushKey key not available!"
  fi
  
  # Remove tmp file
  rm "$TEMP_STRING_XML_PATH"
  echoHeaderValue "Remove created tmp file" $TEMP_STRING_XML_PATH

  echoHeader "-" "-" "${Yellow}"
  echoHeader " " "Change ios platform setting" "${Blue}"
  echoHeader "-" "-" "${Yellow}"
  
  if [ -f "${ASSETS_PATH}/Icon-App-20x20@2x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/Icon-App-20x20@2x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change Icon-App-20x20@2x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/Icon-App-20x20@2x.png"
  else
    echoHeaderValue "Change Icon-App-20x20@2x png file" "${ASSETS_PATH}/Icon-App-20x20@2x.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/Icon-App-29x29@2x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/Icon-App-29x29@2x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change Icon-App-29x29@2x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/Icon-App-29x29@2x.png"
  else
    echoHeaderValue "Change Icon-App-29x29@2x png file" "${ASSETS_PATH}/Icon-App-29x29@2x.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/Icon-App-20x20@3x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/Icon-App-20x20@3x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change Icon-App-20x20@3x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/Icon-App-20x20@3x.png"
  else
    echoHeaderValue "Change Icon-App-20x20@3x png file" "${ASSETS_PATH}/Icon-App-20x20@3x.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/Icon-App-40x40@2x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/Icon-App-40x40@2x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change Icon-App-40x40@2x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/Icon-App-40x40@2x.png"
  else
    echoHeaderValue "Change Icon-App-40x40@2x png file" "${ASSETS_PATH}/Icon-App-40x40@2x.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/Icon-App-29x29@3x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/Icon-App-29x29@3x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change Icon-App-29x29@3x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/Icon-App-29x29@3x.png"
  else
    echoHeaderValue "Change Icon-App-29x29@3x png file" "${ASSETS_PATH}/Icon-App-29x29@3x.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/Icon-App-60x60@2x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/Icon-App-60x60@2x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change Icon-App-60x60@2x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/Icon-App-60x60@2x.png"
  else
    echoHeaderValue "Change Icon-App-60x60@2x png file" "${ASSETS_PATH}/Icon-App-60x60@2x.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/Icon-App-40x40@3x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/Icon-App-40x40@3x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change Icon-App-40x40@3x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/Icon-App-40x40@3x.png"
  else
    echoHeaderValue "Change Icon-App-40x40@3x png file" "${ASSETS_PATH}/Icon-App-40x40@3x.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/Icon-App-60x60@3x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/Icon-App-60x60@3x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change Icon-App-60x60@3x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/Icon-App-60x60@3x.png"
  else
    echoHeaderValue "Change Icon-App-60x60@3x png file" "${ASSETS_PATH}/Icon-App-60x60@3x.png file not found!"
  fi
  if [ -f "${ASSETS_PATH}/ItunesArtwork@2x.png" ]; then
    yes | cp -rf "${ASSETS_PATH}/ItunesArtwork@2x.png" ${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset
    echoHeaderValue "Change ItunesArtwork@2x png file" "${INFO_PLIST_PATH}/Images.xcassets/AppIcon.appiconset/ItunesArtwork@2x.png"
  else
    echoHeaderValue "Change ItunesArtwork@2x png file" "${ASSETS_PATH}/ItunesArtwork@2x.png file not found!"
  fi

  # Copy or replace ios config file
  if [ -f "${FIREBASE_PATH}/GoogleService-Info.plist" ]; then
    yes | cp -rf "${FIREBASE_PATH}/GoogleService-Info.plist" ios/
    echoHeaderValue "Change googleService-info plist file" "ios/GoogleService-Info.plist"
  else
    echoHeaderValue "Change googleService-info plist file" "${FIREBASE_PATH}/GoogleService-Info.plist file not found!"
  fi
  if [ -f "${NATIVE_PATH}/AppCenter-Config.plist" ]; then
    yes | cp -rf "${NATIVE_PATH}/AppCenter-Config.plist" ios/
    echoHeaderValue "Change AppCenter-Config plist file" "ios/AppCenter-Config.plist"
  else
    echoHeaderValue "Change AppCenter-Config plist file" "${NATIVE_PATH}/AppCenter-Config.plist file not found!"
  fi

  # Get ios setting string
  IOS_JSON_DATA=$(cat ${NATIVE_PATH}/ios-string.json)
  IOS_APP_NAME=$(echo $IOS_JSON_DATA | python -c "import sys, json; print json.load(sys.stdin)['appName']")
  IOS_CODEPUSH_KEY=$(echo $IOS_JSON_DATA | python -c "import sys, json; print json.load(sys.stdin)['codePushKey']")
  
  # Change app name in Info.plist
  if [ ! -z "$IOS_APP_NAME" -a "$IOS_APP_NAME" != " " ]; then
    yes | plutil -replace CFBundleDisplayName -string "$IOS_APP_NAME" ${INFO_PLIST_PATH}/Info.plist
    echoHeaderValue "Ios app name" $IOS_APP_NAME
  else
    echoHeaderValue "Ios app name" "${NATIVE_PATH}/ios-string.json in appName key not available!"
  fi

  # Change code push key  
  if [ ! -z "$IOS_CODEPUSH_KEY" -a "$IOS_CODEPUSH_KEY" != " " ]; then
    yes | plutil -replace CodePushDeploymentKey -string "$IOS_CODEPUSH_KEY" ${INFO_PLIST_PATH}/Info.plist
    echoHeaderValue "Ios codepush key" $IOS_CODEPUSH_KEY
  else
    echoHeaderValue "Ios codepush key" "${NATIVE_PATH}/ios-string.json in codePushKey key not available!"
  fi

  echoHeader "-" "-" "${Yellow}"
  echoHeader " " "Change typescript platform setting" "${Blue}"
  echoHeader "-" "-" "${Yellow}"
  
  # Get typescript setting string
  TS_JSON_DATA=$(cat ${NATIVE_PATH}/typescript-string.json)
  TS_SENTRY_URL=$(echo $TS_JSON_DATA | python -c "import sys, json; print json.load(sys.stdin)['sentryUrl']")
  TS_SEGMENT_KEY=$(echo $TS_JSON_DATA | python -c "import sys, json; print json.load(sys.stdin)['segment']")
  TS_API_URL=$(echo $TS_API_URL | python -c "import sys, json; print json.load(sys.stdin)['apiUrl']")
  
  # Change typescript config
  if [ ! -z "$TS_SENTRY_URL" -a "$TS_SENTRY_URL" != " " ]; then
    sed -i '' -e 's~SENTRY_URL.*~SENTRY_URL = '"${TS_SENTRY_URL}"'~' .env
    echoHeaderValue "Ts sentry url" $TS_SENTRY_URL
  else
    echoHeaderValue "Ts sentry url" "${NATIVE_PATH}/typescript-string.json in sentryUrl key not available!"
  fi
  if [ ! -z "$TS_SEGMENT_KEY" -a "$TS_SEGMENT_KEY" != " " ]; then
    sed -i '' -e 's~SEGMENT_KEY.*~SEGMENT_KEY = '"${TS_SEGMENT_KEY}"'~' .env
    echoHeaderValue "Ts segment key" $TS_SEGMENT_KEY
  else
    echoHeaderValue "Ts segment key" "${NATIVE_PATH}/typescript-string.json in segment key not available!"
  fi
  if [ ! -z "$TS_API_URL" -a "$TS_API_URL" != " " ]; then
    sed -i '' -e 's~API_URL.*~API_URL = '"${TS_API_URL}"'~' .env
    echoHeaderValue "Ts api url" $TS_DOMAIN
  else
    echoHeaderValue "Ts api url" "${NATIVE_PATH}/typescript-string.json in apiUrl key not available!"
  fi
  if [ ! -z "$ENV" -a "$ENV" != " " ]; then
    sed -i '' -e 's~ENVIRONMENT.*~ENVIRONMENT = '"${ENV}"'~' .env
    echoHeaderValue "Ts environment" $ENV
  else
    echoHeaderValue "Ts environment" "Environment not available!"
  fi
fi  

if [[ "$TYPE_OF_OPERATION" == "build" || "$TYPE_OF_OPERATION" == "setupWithBuild"  || "$TYPE_OF_OPERATION" == "buildWithKeystore" ]]; then
  echoHeader "-" "-" "${Yellow}"
  echoHeader " " "Please wait while update build version" "${Pink}"
  echoHeader "-" "-" "${Yellow}"

  Version_No_Ios=$(/usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" ${INFO_PLIST_PATH}/Info.plist)
  BUNDLE_NO_IOS=$(/usr/libexec/PlistBuddy -c "Print :CFBundleVersion" ${INFO_PLIST_PATH}/Info.plist)
  echoHeaderValue "OLD ios" "verions-${Version_No_Ios} & build-${BUNDLE_NO_IOS}"
  
  IFS=.
  ary=($Version_No_Ios)
  for key in "${!ary[@]}"; do 
    if [ $key == 0 ]; then
        VERSION_MAJOR_IOS="${ary[$key]}"
    fi
    if [ $key == 1 ]; then
        VERSION_MINOR_IOS="${ary[$key]}"
    fi
  done
        
  case $VERSION_TYPE in
    major)
      VERSION_MAJOR_IOS=$((VERSION_MAJOR_IOS+1))
      VERSION_MINOR_IOS=0
      ;;
    minor)
      VERSION_MINOR_IOS=$((VERSION_MINOR_IOS+1))
      ;;
    code)
      BUNDLE_NO_IOS=$((BUNDLE_NO_IOS+1))
      ;;
    majorWithCode)
      VERSION_MAJOR_IOS=$((VERSION_MAJOR_IOS+1))
      VERSION_MINOR_IOS=0
      BUNDLE_NO_IOS=$((BUNDLE_NO_IOS+1))
      ;;
    minorWithCode)
      VERSION_MINOR_IOS=$((VERSION_MINOR_IOS+1))
      BUNDLE_NO_IOS=$((BUNDLE_NO_IOS+1))
      ;;
    reset)
      VERSION_MAJOR_IOS=1
      VERSION_MINOR_IOS=0
      BUNDLE_NO_IOS=1
      ;;
    *)
      ;;
  esac

  plutil -replace CFBundleShortVersionString -string ${VERSION_MAJOR_IOS}.${VERSION_MINOR_IOS} ${INFO_PLIST_PATH}/Info.plist
  plutil -replace CFBundleVersion -string ${BUNDLE_NO_IOS} ${INFO_PLIST_PATH}/Info.plist
  echoHeaderValue "NEW ios" "verions-${VERSION_MAJOR_IOS}.${VERSION_MINOR_IOS} & build-${BUNDLE_NO_IOS}"
  
  VersionAndroid=`awk '/versionName [\"0-9.]/ {print $2}' android/app/build.gradle`
  CodeAndroid=`awk '/versionCode [0-9]/ {print $2}' android/app/build.gradle`
  Version_No_Android=`echo "$VersionAndroid" | sed 's/[^0-9]*/_/g' | sed 's/^.//;s/.$//'`
  BUNDLE_NO_ANDROID=`echo "$CodeAndroid" | sed 's/[^0-9]*//g'`
  echoHeaderValue "OLD android" "verions-${Version_No_Android} & build-${BUNDLE_NO_ANDROID}"
  
  IFS=_
  ary=($Version_No_Android)
  for key in "${!ary[@]}"; do
    VALUES=`echo "${ary[$key]}" | sed 's/"//g'`
    if [ $key == 0 ]; then
        VERSION_MAJOR_ANDROID=$VALUES
    fi
    if [ $key == 1 ]; then
        VERSION_MINOR_ANDROID=$VALUES
    fi
  done

  case $VERSION_TYPE in
    major)
      VERSION_MAJOR_ANDROID=$((VERSION_MAJOR_ANDROID+1))
      VERSION_MINOR_ANDROID=0
      ;;
    minor)
      VERSION_MINOR_ANDROID=$((VERSION_MINOR_ANDROID+1))
      ;;
    code)
      BUNDLE_NO_ANDROID=$((BUNDLE_NO_ANDROID+1))
      ;;
    majorWithCode)
      VERSION_MAJOR_ANDROID=$((VERSION_MAJOR_ANDROID+1))
      VERSION_MINOR_ANDROID=0
      BUNDLE_NO_ANDROID=$((BUNDLE_NO_ANDROID+1))
      ;;
    minorWithCode)
      VERSION_MINOR_ANDROID=$((VERSION_MINOR_ANDROID+1))
      BUNDLE_NO_ANDROID=$((BUNDLE_NO_ANDROID+1))
      ;; 
    reset)
      VERSION_MAJOR_ANDROID=1
      VERSION_MINOR_ANDROID=0
      BUNDLE_NO_ANDROID=1
      ;;       
    *)
      ;;
  esac

  sed -i '' -e "s/versionName *[\"0-9.]*/versionName \"${VERSION_MAJOR_ANDROID}.${VERSION_MINOR_ANDROID}\"/" android/app/build.gradle
  sed -i '' -e "s/ versionCode *[0-9]*/ versionCode $BUNDLE_NO_ANDROID/" android/app/build.gradle
  echoHeaderValue "NEW android" "verions-${VERSION_MAJOR_ANDROID}.${VERSION_MINOR_ANDROID} & build-${BUNDLE_NO_ANDROID}"
 
  sed -i '' -e 's/const appVersion.*/const appVersion = '"'v${VERSION_MAJOR_IOS}.${VERSION_MINOR_IOS}(${BUNDLE_NO_IOS})';"'/' src/constants/App.const.ts
  echoHeaderValue "NEW typescript" "verions-v${VERSION_MAJOR_IOS}.${VERSION_MINOR_IOS}(${BUNDLE_NO_IOS})"

  echoHeader "-" "-" "${Yellow}"
  echoHeader " " "Applying git commit" "${Green}"
  echoHeader "-" "-" "${Yellow}"
  lazygit "release: TASK-0000: Release new build with verions-v${VERSION_MAJOR_IOS}.${VERSION_MINOR_IOS}(${BUNDLE_NO_IOS})"
fi  

if [[ "$TYPE_OF_OPERATION" == "keystore" || "$TYPE_OF_OPERATION" == "setupWithKeystore" || "$TYPE_OF_OPERATION" == "buildWithKeystore" ]]; then
  echoHeader "-" "-" "${Yellow}"
  echoHeader " " "Generate Android Keystore" "${Purple}"
  echoHeader "-" "-" "${Yellow}"
  #Create keystore file if not exit.
  KEYSTORE_FILE=Scripts/Configs/Keystore/${ENV}/release.jks
  if [ -f "${KEYSTORE_FILE}" ]; then
      echoHeaderValue "Android keystore" "${KEYSTORE_FILE} file exist!"
  else
      keytool -genkey -alias androidreleasekey -keyalg RSA -keystore $KEYSTORE_FILE -dname "cn=localhost, ou=IT, o=Continuent, c=US" -storepass password -keypass password -validity 18250
      echoHeaderValue "Android keystore" "${KEYSTORE_FILE} keystore generated!"
  fi
fi

echoHeader "-" "-" "${Yellow}"
echoHeader " " "Successfully update project setting, Enjoy now" "${Purple}"
echoHeader "-" "-" "${Yellow}"