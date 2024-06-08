### Description

**Anbeeld's Stockpile Economy** aka **ASE** is a mod that aims to implement a general stockpile system in Victoria 3. The goal is to make it feel like a natural, useful and important part of the game that fits well into its market design. It has a friendly UI and helpful tooltips, can be used by both players and AI countries and is optimized to impact performance as little as possible.

The mod allows you to set **Price Targets** for all goods individually, and then the **Stockpile** of your country will buy them when the price falls below **Saving** target and sell when it's above **Spending** target. Naturally, **Saving** costs money for the government, while **Spending** means you'll get the money back, as in both cases you buy and sell goods directly in the market.

**Stockpile** is stored on a **state basis**. You can control what goods and in which states you want to **Stockpile** with mod's UI. **Game Rules** are there as well to customize how the system works.

**[Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3249228964)**  
**[Paradox Mods](https://mods.paradoxplaza.com/mods/81091/Any)**  
**[Paradox Forum](https://forum.paradoxplaza.com/forum/threads/mod-anbeelds-stockpile-economy.1679214/)**

[![Support my work!](https://i.imgur.com/Xp3sMoF.jpeg)](https://buymeacoffee.com/anbeeld)

### Compatibility

Works absolutely fine when added to existing saves without the mod.

To remove the mod during the playthrough you need to open the "Decisions" tab and activate "Remove everything related to stockpiling" decision, then exit the game and disable the mod. Without doing it there will be problematic leftovers. The decision has no effect in multiplayer.

Doesn't work with non-vanilla goods out of the box, but it's very much possible to create compatibility patches, see "tools" directory in this repo. You can still use ASE with mods that add new goods even without a patch, but you won't be able to stockpile them.

### Performance

A lot of time and effort were put specifically to make sure the mod affects game's performance as little as possible. Some parts of the code were reworked 3+ times just because of this without functionality changes. But there's always room for improvement, so I'll try to further optimize it.

Another concern is usage of hidden buildings for stockpiling, which affects performance a bit. Unfortunately there's no way to avoid this issue, but I did my best to minimize the impact it has.

### Manual installation

1) Download [the archive](https://github.com/Anbeeld/ASE/releases) with the latest version.
2) Unpack it so you have a folder named "Anbeeld's Stockpile Economy" with mod's contents inside.
3) Go to "Documents > Paradox Interactive > Victoria 3 > mod" or create such a folder if it doesn't exist.
4) Place your "Anbeeld's Stockpile Economy" folder here. If there'a already such a folder, delete it before that.
5) Open launcher and add the mod to your playset or create a new playset with it if you don't have one.

![Anbeeld's Stockpile Economy](https://forumcontent.paradoxplaza.com/public/1125490/1.jpg)