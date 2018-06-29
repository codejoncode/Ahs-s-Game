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

All the files are to be placed inside `src` folder from the root of
the repository for example the Character.js will go into
`/src/Gameplay/Character.js`

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
armor pieces for the player, as `Weapon` and `ArmorPiece` objects (See below).

```
class PlayerCharacter extends Character
  Fields
    adrenaline: int
    pointsAvailableForLevelUp: int
    inventory: {
      weapons: [Weapon],
      armor: [ArmorPiece]
    }
  Methods
    attack() => { type: int, damage: int }
      baseAttack = super.attack()
      baseDamage =  baseAttack.damage
      actualDamage = baseDamage * rand(
        currentEquipment.weapon.criticalHitFactor + adrenline * 0.5
      )
      accuracy = currentEquipment.weapon.accuracy * (stats.dexterity/1000)
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

### NonPlayerCharacter

filename: `Gameplay/NonPlayerCharacter.js`

The NPCs are various characters that the player will encounter in the world
and interact to trigger various events and battles. This is mainly a feature
for Phase II of the project, hence there is no specification for this class.

### Weapon

filename: `Gameplay/Weapon.js`

The weapon class constructs objects that come from the `ModuleSystem` (see
below).

```
class Weapon
  Fields
    id: int
    name: string
    baseDamage: int
    damageType: int
    criticalHitRatio: float 0 - 1
    crticalHitFactor: float 1+
    durability: Phase II
    scaling: {
      strength: float[0, 0.15, 0.30, 0.45]
      dexterity: float[0, 0.15, 0.30, 0.45]
      intelligence: float[0, 0.15, 0.30, 0.45]
    }
    accuracy: float 0 - 1
    requirement: Phase II
  Methods
    getDamage(stats) => int
      strengthBonus = 1;
      for(i = 1; i < stats.strength; i++))
        strengthBonus += 1 / (i + 1);
      strengthBonus *= scaling.strength
      likewise for intelligence and dexterity
      totalDamage = Math.floor(baseDamage * (1 + strengthBonus + dexBonus + intBonus ))
      return totalDamage
```
