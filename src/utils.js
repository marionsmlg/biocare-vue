import IconOilySkin from '@/components/icons/SkinTypes/IconOilySkin.vue'
import IconDrySkin from '@/components/icons/SkinTypes/IconDrySkin.vue'
import IconNormalSkin from '@/components/icons/SkinTypes/IconNormalSkin.vue'
import IconMixedSkin from '@/components/icons/SkinTypes/IconMixedSkin.vue'
import IconSmoothHair from '@/components/icons/HairTypes/IconSmoothHair.vue'
import IconFrizzyHair from '@/components/icons/HairTypes/IconFrizzyHair.vue'
import IconWavyHair from '@/components/icons/HairTypes/IconWavyHair.vue'
import IconCurlyHair from '@/components/icons/HairTypes/IconCurlyHair.vue'
import { markRaw } from 'vue'
import { z } from 'zod'
import { auth } from '@/firebaseconfig.js'
import { onAuthStateChanged } from 'firebase/auth'

export function addIcon(objectWithoutIcon) {
  const arrOfIcons = [
    {
      name: 'Sèche',
      icon: markRaw(IconDrySkin)
    },
    {
      name: 'Grasse',
      icon: markRaw(IconOilySkin)
    },
    {
      name: 'Mixte',
      icon: markRaw(IconMixedSkin)
    },
    {
      name: 'Normale',
      icon: markRaw(IconNormalSkin)
    },
    { name: 'Lisses', icon: markRaw(IconSmoothHair) },
    { name: 'Ondulés', icon: markRaw(IconWavyHair) },
    { name: 'Bouclés', icon: markRaw(IconCurlyHair) },
    { name: 'Frisées / Crépus', icon: markRaw(IconFrizzyHair) }
  ]

  if (Array.isArray(objectWithoutIcon)) {
    for (const objet of objectWithoutIcon) {
      const correspondingIcon = arrOfIcons.find((icon) => icon.name === objet.name)

      if (correspondingIcon) {
        objet.icon = correspondingIcon.icon
      }
    }
  } else {
    const correspondingIcon = arrOfIcons.find((icon) => icon.name === objectWithoutIcon.name)
    if (correspondingIcon) {
      objectWithoutIcon.icon = correspondingIcon.icon
    }
  }
}

export function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://purecare-api-production.up.railway.app'
    : 'http://localhost:3000'

// export const apiUrl = 'http://localhost:5174'

export function pushObjectValueInNewArr(arrOfobject) {
  const newArr = []
  for (const object of arrOfobject) {
    const arrOfkey = Object.keys(object)
    const key = arrOfkey[0]
    newArr.push(object[key])
  }
  return newArr
}

export function dataUserAreValid(user) {
  const UserSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(6)
      .max(100)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/),
    confirmPassword: z
      .string()
      .min(6)
      .max(100)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
  })
  return UserSchema.safeParse(user).success
}

export function uuidIsValid(uuid) {
  const uuidSchema = z.string().uuid({ message: 'Invalid UUID' })
  return uuidSchema.safeParse(uuid).success
}

export function uidFirebaseValid(uidFirebase) {
  const uidSchema = z.string().refine((value) => /^[a-zA-Z0-9]{28}$/.test(value), {
    message: "L'UID Firebase n'est pas valide."
  })
  const result = uidSchema.safeParse(uidFirebase)
  if (result.success) {
    return result.data
  } else {
    return null
  }
}

export async function userHasBeautyProfile(userId) {
  if (userId) {
    const queryString = `/api/user?user_id=${userId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const data = await response.json()
    return data
  } else {
    return
  }
}

export async function postData(url, data) {
  try {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
    } else {
      console.error("L'utilisateur n'est pas connecté.")
    }
  } catch (error) {
    console.error(error)
  }
}

export async function updateData(url, data) {
  try {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
    } else {
      console.error("L'utilisateur n'est pas connecté.")
    }
  } catch (error) {
    console.error(error)
  }
}

export async function deleteData(url) {
  const user = auth.currentUser
  try {
    if (user) {
      const token = await user.getIdToken()
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    } else {
      console.error("L'utilisateur n'est pas connecté.")
    }
  } catch (error) {
    console.error(error)
  }
}
