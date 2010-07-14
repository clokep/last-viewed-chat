/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is the Reply To Nick Instantbird add-on, released
 * 2010.
 *
 * The Initial Developer of the Original Code is
 * Florian QUEZE <florian@instantbird.org>.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *		Patrick Cloke (clokep@gmailcom)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

var lastViewedChat = {
	onattrmod: function(aEvent) {
		// Only fire when the selectedIndex is modified
		if (aEvent.attrChange == MutationEvent.MODIFICATION && aEvent.attrName == "selectedIndex") {
			// Get the document of the current tab
			let document = getBrowser().contentDocument;
			
			// Only add a line if something has been added to the body
			if (document.getElementById("Chat").innerHTML != "") {
				// Remove node that indicates where the next message should be inserted, if it exists
				let insert = document.getElementById("insert");
				if (insert)
					insert.parentNode.removeChild(insert);

				// Remove old ruler, if it exists
				let oldRuler = document.getElementById("last-viewed-chat-ruler");
				if (oldRuler)
					oldRuler.parentNode.removeChild(oldRuler);

				// Create the new element
				let ruler = document.createElement("hr");
				ruler.id = "last-viewed-chat-ruler";
				document.getElementById("Chat").appendChild(ruler);

				// Tell the system to end groupings
				getBrowser().selectedBrowser._lastMessage = null;
			}
		}
	},
	addListener: function() {
		let tabbrowser = getBrowser();

		// Only add the listener to chats
		if (tabbrowser.selectedConversation.hasAttribute("chat"))
			tabbrowser.addEventListener("DOMAttrModified", lastViewedChat.onattrmod, false);
	},
	load: function() {
		getBrowser().tabContainer
					.addEventListener("TabSelect", lastViewedChat.addListener, true);
		lastViewedChat.addListener();
	}
};

this.addEventListener("load", lastViewedChat.load, false);
