# Phase I

## Introduction

In this phase of the project, we will try and build a testing
battleground where the user will be allowed to play one on one with a
randomly chosen NPC opponent. The user will be given a random load out
and a few choices, the user will also be shown his opponents' loadout so
that the user may prepare better for the battle by making careful choices
about his gear. Then a turn-based combat is ensued till we have a winner.
This phase will end up creating a game like chess, just one game.

**Purpose** Battle mechanics will be one of the core elements of the game
and we want to make sure that we get this right before moving on to other
elements. Once Phase I is complete, we would ideally want people to test
this battle mechanics thoroughly by playing the battle mode several times
and sending the developers the logs of battle. The developers can then take
a look at the logs and tweak the numbers till they get it right.

## Implementation of the specification

In order to complete this Phase, the following specification must be
completed. Please note each of the following classes need to be implemented
in a file named after the name of the class.

**Note**: The developer is expected to implement the specification by using
any means necessary. In order to keep the specification simple, the use
of `this` is avoided.

### Character

filename: `Gameplay/Character.js`

This is the base class of all characters in the game. The fields are self
explanatory. Please note that the currently equiped weapon/armor have values
which are of type of the specified classes. Refer Weapon and ArmorPiece
specification for weapon/armor specific methods.

```
class Character
  Fields
    hp: int
    totalHP: int
    name: string
    currentEquipment: {
      weapon: Weapon,
      armor: {
        head: ArmorPiece,
        torso: ArmorPiece,
        hands: ArmorPiece,
        legs: ArmorPiece,
        ring: Buff
      }
    }
    stats: {
      strength: int,
      intelligence: int,
      dexterity: int
    }
  Methods
    attack() => { type: int, damage: int }
      type = currentEquipment.weapon.damageType
      damage = currentEquipment.weapon.getDamage(stats)

    getLevel() => int
      return Math.floor((strength + intelligence + dexterity) / 5)

    takeDamage(attackObject) => int
      totalDefense = objectAdd(
        armor.head.getDefense(),
        armor.torso.getDefense(),
        armor.hands.getDefense(),
        armor.legs.getDefense(),
        armor.ring.getDefense()
      )
      if attack.type = physical
        damageTaken = attackObject.damage - totalDefense[attackObject.type]
      else
        damageTaken = attackObject.damage * (1 - totalDefense[attackObject.type])
      hp -= damageTaken
      return damageTaken
```

### PlayerCharacter

filename: `Gameplay/PlayerCharacter.js`

This will represent the user's character and is an extension of the main
character class and will additionally have other attributes and methods
specific to this class. For the sake of brevity, only those attributes
which are specific to the class are mentioned here. If you see a method
with the same name as the parent class, that means the method is being overridden.
The inventory object will contain the list of available weapons and
armor pieces for the player, as `id`s of the objects. This `id` is looked
up to create an actual object when they are equipped. See `ModuleSystem`
below for more details.

```
class PlayerCharacter extends Character
  Fields
    adrenaline: int
    pointsAvailableForLevelUp: int
    inventory: {
      weapons: [int],
      armor: [int]
    }
  Methods
    attack() => { type: int, damage: int }
      baseAttack = super.attack()
      baseDamage =  baseAttack.damage
      actualDamage = baseDamage * rand(
        currentEquipment.weapon.criticalHitFactor + adrenline * 0.5
      )
      accuracy = currentEquipment.weapon.accuracy * (1 + stats.dexterity/100)
      if rand <= accuracy
        return { type: baseAttack.type, damage: actualDamage }
      else
        return { type: baseAttack.type, damage: 0 }

    takeDamage(attackObj) => int
      damageTaken = super.takeDamage(attackObj)
      adrenaline = (totalHP - hp ) / totalHP

    levelUp(xp)
      Will be implemented in Phase II

    addStats(addlPoints) => void
      check if total addlPoints <= poinstAvailableForLevelUp
      stats.strength += addlPoints.strength
      stats.intelligence += addlPoints.intelligence
      stats.dexterity += addlPoints.dexterity
```
